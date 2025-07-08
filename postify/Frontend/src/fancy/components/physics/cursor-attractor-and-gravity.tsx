import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { calculatePosition } from "../../../utils/calculate-position";
import { parsePathToVertices } from "../../../utils/svg-path-to-vertices";
import { debounce } from "lodash";
import Matter, {
  Bodies,
  Common,
  Engine,
  Events,
  Render,
  Runner,
  World,
  Body,
} from "matter-js";
import { clsx as cn } from "clsx";
import { useMousePositionRef } from "../../../hooks/use-mouse-position-ref";

type GravityProps = {
  children: ReactNode;
  debug?: boolean;
  attractorPoint?: { x: number | string; y: number | string };
  attractorStrength?: number;
  cursorStrength?: number;
  cursorFieldRadius?: number;
  resetOnResize?: boolean;
  addTopWall?: boolean;
  autoStart?: boolean;
  className?: string;
};

type PhysicsBody = {
  element: HTMLElement;
  body: Matter.Body;
  props: MatterBodyProps;
};

type MatterBodyProps = {
  children: ReactNode;
  matterBodyOptions?: Matter.IBodyDefinition;
  isDraggable?: boolean;
  bodyType?: "rectangle" | "circle" | "svg";
  sampleLength?: number;
  x?: number | string;
  y?: number | string;
  angle?: number;
  className?: string;
};

export type GravityRef = {
  start: () => void;
  stop: () => void;
  reset: () => void;
};

const GravityContext = createContext<{
  registerElement: (
    id: string,
    element: HTMLElement,
    props: MatterBodyProps
  ) => void;
  unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
  children,
  className,
  matterBodyOptions = {
    friction: 0.1,
    restitution: 0.1,
    density: 0.001,
    isStatic: false,
  },
  bodyType = "circle",
  isDraggable = true,
  sampleLength = 15,
  x = 0,
  y = 0,
  angle = 0,
  ...props
}: MatterBodyProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(GravityContext);

 useEffect(() => {
   if (!elementRef.current || !context) return;

   const currentId = idRef.current;
   const currentElement = elementRef.current;

context.registerElement(currentId, currentElement, {
  children,
  matterBodyOptions,
  bodyType,
  sampleLength,
  isDraggable,
  x,
  y,
  angle,
  className,
});


   return () => {
     if (context) context.unregisterElement(currentId);
   };
 }, [
   className,
   props,
   children,
   matterBodyOptions,
   isDraggable,
   context,
   x,
   y,
   angle,
   sampleLength,
   bodyType,
 ]);


  return (
    <div
      ref={elementRef}
      className={cn("absolute", className)}
    >
      {children}
    </div>
  );
};

const Gravity = forwardRef<GravityRef, GravityProps>((props, ref) => {
  const {
    children,
    debug = false,
    attractorPoint = { x: 0.5, y: 0.5 },
    attractorStrength = 0.001,
    cursorStrength = 0.0005,
    cursorFieldRadius = 100,
    resetOnResize = true,
    addTopWall = true,
    autoStart = true,
    className,
    ...restProps
  } = props;

  const canvas = useRef<HTMLDivElement>(null);
  const engine = useRef(Engine.create());
const render = useRef<Render | null>(null);
const runner = useRef<Runner | null>(null);

  const bodiesMap = useRef(new Map<string, PhysicsBody>());
 const frameId = useRef<number | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
const mouseRef = useMousePositionRef(canvas as React.RefObject<HTMLElement>);
  const isRunning = useRef(false);

  // Register Matter.js body in the physics world
  const registerElement = useCallback(
    (id: string, element: HTMLElement, props: MatterBodyProps) => {
      if (!canvas.current) return;
      
      try {
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const canvasRect = canvas.current.getBoundingClientRect();

        const angle = (props.angle || 0) * (Math.PI / 180);
        const x = calculatePosition(props.x, canvasRect.width, width);
        const y = calculatePosition(props.y, canvasRect.height, height);

        let body: Matter.Body | null = null;

        if (props.bodyType === "circle") {
          const radius = Math.max(width, height) / 2;
          body = Bodies.circle(x, y, radius, {
            ...props.matterBodyOptions,
            angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              strokeStyle: debug ? "#333333" : "#00000000",
              lineWidth: debug ? 3 : 0,
            },
          });
        } else if (props.bodyType === "svg") {
          const paths = element.querySelectorAll("path");
          const vertexSets: Matter.Vector[][] = [];

          paths.forEach((path) => {
            const d = path.getAttribute("d");
            if (d) {
              const p = parsePathToVertices(d, props.sampleLength || 15);
              vertexSets.push(p);
            }
          });

          if (vertexSets.length > 0) {
            body = Bodies.fromVertices(x, y, vertexSets, {
              ...props.matterBodyOptions,
              angle,
              render: {
                fillStyle: debug ? "#888888" : "#00000000",
                strokeStyle: debug ? "#333333" : "#00000000",
                lineWidth: debug ? 3 : 0,
              },
            });
          }
        } else {
          // Default to rectangle
          body = Bodies.rectangle(x, y, width, height, {
            ...props.matterBodyOptions,
            angle,
            render: {
              fillStyle: debug ? "#888888" : "#00000000",
              strokeStyle: debug ? "#333333" : "#00000000",
              lineWidth: debug ? 3 : 0,
            },
          });
        }

        if (body) {
          World.add(engine.current.world, [body]);
          bodiesMap.current.set(id, { element, body, props });
        }
      } catch (error) {
        console.error("Error registering physics element:", error);
      }
    },
    [debug]
  );

  // Unregister Matter.js body from the physics world
  const unregisterElement = useCallback((id: string) => {
    try {
      const body = bodiesMap.current.get(id);
      if (body) {
        World.remove(engine.current.world, body.body);
        bodiesMap.current.delete(id);
      }
    } catch (error) {
      console.error("Error unregistering physics element:", error);
    }
  }, []);

  // Keep react elements in sync with the physics world
  const updateElements = useCallback(() => {
    try {
      bodiesMap.current.forEach(({ element, body }) => {
        if (element && body) {
          const { x, y } = body.position;
          const rotation = body.angle * (180 / Math.PI);
          element.style.transform = `translate(${
            x - element.offsetWidth / 2
          }px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
        }
      });
      frameId.current = requestAnimationFrame(updateElements);
    } catch (error) {
      console.error("Error updating elements:", error);
    }
  }, []);

  const initializeRenderer = useCallback(async () => {
    if (!canvas.current || isRunning.current) return;

    try {
      const height = canvas.current.offsetHeight;
      const width = canvas.current.offsetWidth;

      // Load poly-decomp dynamically
    try {
      const polyDecomp = await import("poly-decomp");
      const decomp = polyDecomp?.default || polyDecomp;

      if (typeof decomp.quickDecomp === "function") {
        Common.setDecomp(decomp); // ✅ only if it has the correct API
      } else {
        console.warn("poly-decomp does not have quickDecomp function.");
      }
    } catch (err) {
      console.warn("poly-decomp import failed:", err);
    }



      // Remove default gravity
      engine.current.gravity.x = 0;
      engine.current.gravity.y = 0;

      render.current = Render.create({
        element: canvas.current,
        engine: engine.current,
        options: {
          width,
          height,
          wireframes: false,
          background: "#00000000",
        },
      });

      // Add walls
      const walls = [
        // Floor
        Bodies.rectangle(width / 2, height + 10, width, 20, {
          isStatic: true,
          friction: 1,
          render: {
            visible: debug,
          },
        }),

        // Right wall
        Bodies.rectangle(width + 10, height / 2, 20, height, {
          isStatic: true,
          friction: 1,
          render: {
            visible: debug,
          },
        }),

        // Left wall
        Bodies.rectangle(-10, height / 2, 20, height, {
          isStatic: true,
          friction: 1,
          render: {
            visible: debug,
          },
        }),
      ];

      if (addTopWall) {
        walls.push(
          Bodies.rectangle(width / 2, -10, width, 20, {
            isStatic: true,
            friction: 1,
            render: {
              visible: debug,
            },
          })
        );
      }

      World.add(engine.current.world, walls);

      runner.current = Runner.create();
      Render.run(render.current);
      updateElements();
      runner.current.enabled = false;

      if (autoStart) {
        runner.current.enabled = true;
        startEngine();
      }

      // Add force application before update
      Events.on(engine.current, "beforeUpdate", () => {
        const bodies = engine.current.world.bodies.filter(
          (body) => !body.isStatic
        );

        // Calculate attractor position in pixels
        const attractorX =
          typeof attractorPoint.x === "string"
            ? (width * parseFloat(attractorPoint.x)) / 100
            : width * attractorPoint.x;

        const attractorY =
          typeof attractorPoint.y === "string"
            ? (height * parseFloat(attractorPoint.y)) / 100
            : height * attractorPoint.y;


        bodies.forEach((body) => {
          // Apply attractor force
          const dx = attractorX - body.position.x;
          const dy = attractorY - body.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0) {
            const force = {
              x: (dx / distance) * attractorStrength * body.mass,
              y: (dy / distance) * attractorStrength * body.mass,
            };
            Body.applyForce(body, body.position, force);
          }

          // Apply cursor force if mouse is present
          if (mouseRef.current?.x && mouseRef.current?.y && 
              mouseRef.current.x > 0 && mouseRef.current.y > 0) {
            const mdx = mouseRef.current.x - body.position.x;
            const mdy = mouseRef.current.y - body.position.y;
            const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mouseDistance > 0 && mouseDistance < cursorFieldRadius) {
              const mouseForce = {
                x: (mdx / mouseDistance) * cursorStrength * body.mass,
                y: (mdy / mouseDistance) * cursorStrength * body.mass,
              };
              Body.applyForce(body, body.position, mouseForce);
            }
          }
        });
      });
    } catch (error) {
      console.error("Error initializing physics renderer:", error);
    }
  }, [updateElements, debug, autoStart, attractorPoint, attractorStrength, cursorStrength, addTopWall]);

  // Clear the Matter.js world
  const clearRenderer = useCallback(() => {
    try {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }

      if (render.current) {
        Render.stop(render.current);
        render.current.canvas.remove();
      }

      if (runner.current) {
        Runner.stop(runner.current);
      }

      if (engine.current) {
        World.clear(engine.current.world, false);
        Engine.clear(engine.current);
      }

      bodiesMap.current.clear();
    } catch (error) {
      console.error("Error clearing renderer:", error);
    }
  }, []);

  const handleResize = useCallback(() => {
    if (!canvas.current || !resetOnResize) return;

    try {
      const newWidth = canvas.current.offsetWidth;
      const newHeight = canvas.current.offsetHeight;
      setCanvasSize({ width: newWidth, height: newHeight });
      clearRenderer();
      initializeRenderer();
    } catch (error) {
      console.error("Error handling resize:", error);
    }
  }, [clearRenderer, initializeRenderer, resetOnResize]);

  const startEngine = useCallback(() => {
    try {
      if (runner.current) {
        runner.current.enabled = true;
        Runner.run(runner.current, engine.current);
      }
      if (render.current) {
        Render.run(render.current);
      }
      frameId.current = requestAnimationFrame(updateElements);
      isRunning.current = true;
    } catch (error) {
      console.error("Error starting engine:", error);
    }
  }, [updateElements]);

  const stopEngine = useCallback(() => {
    try {
      if (!isRunning.current) return;

      if (runner.current) {
        Runner.stop(runner.current);
      }
      if (render.current) {
        Render.stop(render.current);
      }
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      isRunning.current = false;
    } catch (error) {
      console.error("Error stopping engine:", error);
    }
  }, []);

  const reset = useCallback(() => {
    try {
      stopEngine();
      bodiesMap.current.forEach(({ element, body, props }) => {
        if (element && body) {
          body.angle = props.angle || 0;
          const x = calculatePosition(
            props.x,
            canvasSize.width,
            element.offsetWidth
          );
          const y = calculatePosition(
            props.y,
            canvasSize.height,
            element.offsetHeight
          );
          body.position.x = x;
          body.position.y = y;
        }
      });
      updateElements();
      handleResize();
    } catch (error) {
      console.error("Error resetting physics:", error);
    }
  }, [stopEngine, canvasSize.width, canvasSize.height, updateElements, handleResize]);

  useImperativeHandle(
    ref,
    () => ({
      start: startEngine,
      stop: stopEngine,
      reset,
    }),
    [startEngine, stopEngine, reset]
  );

  useEffect(() => {
    if (!resetOnResize) return;

    const debouncedResize = debounce(handleResize, 500);
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      debouncedResize.cancel();
    };
  }, [handleResize, resetOnResize]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await initializeRenderer();
      if (!mounted) return;
    };

    init();

    return () => {
      mounted = false;
      clearRenderer();
    };
  }, [initializeRenderer, clearRenderer]);

  return (
    <GravityContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={canvas}
        className={cn(
          "border-none" , className,
          "absolute top-0 left-0 w-full h-full bg-black  rounded-full"
        )}
        {...restProps}
      >
        {children}
      </div>
    </GravityContext.Provider>
  );
});

Gravity.displayName = "Gravity";
export default Gravity;