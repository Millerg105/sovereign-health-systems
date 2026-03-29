"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const scaleDimensions = () => {
        return isMobile ? [0.82, 0.97] : [0.85, 1];
    };

    const rotate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [20, 0]);
    const scale = useTransform(scrollYProgress, [0.3, 0.7], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 0.4], isMobile ? [0, -60] : [0, -120]);
    const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0.6, 1]);

    return (
        <div
            className="h-[70rem] md:h-[90rem] flex items-center justify-center relative px-1 py-2 md:p-20"
            ref={containerRef}
        >
            <div
                className="py-10 md:py-40 w-full relative"
                style={{
                    perspective: "1000px",
                }}
            >
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale} opacity={opacity}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
    return (
        <motion.div
            style={{
                translateY: translate,
            }}
            className="div max-w-5xl mx-auto text-center"
        >
            {titleComponent}
        </motion.div>
    );
};

export const Card = ({
    rotate,
    scale,
    opacity,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    opacity: MotionValue<number>;
    children: React.ReactNode;
}) => {
    return (
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                opacity,
                boxShadow:
                    "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            }}
            className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-[calc(100vw-0.75rem)] sm:w-full border-2 md:border-4 border-[#6C6C6C] p-1 md:p-6 bg-[#222222] rounded-[22px] md:rounded-[30px] shadow-2xl"
        >
            <div className="h-full w-full overflow-hidden rounded-[18px] md:rounded-2xl bg-gray-100 dark:bg-zinc-900 md:p-4">
                {children}
            </div>
        </motion.div>
    );
};
