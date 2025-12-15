import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import ArrowForwardIosIcon from "../../assets/arrow_forward.svg";
import ArrowBackIosNewIcon from "../../assets/arrow_back.svg";

import img1 from "../../assets/Rectangle 3.svg";
import img2 from "../../assets/Rectangle 7.svg";
import img3 from "../../assets/Mask group.svg";
import img4 from "../../assets/Rectangle 7.svg";
import img5 from "../../assets/img5.jpg";
import img6 from "../../assets/img6.jpg";
import Smiley from "../../assets/smiley face.svg";

// Original images
const originalImages = [img1, img2, img3, img4, img5, img6];

// Triplicate for seamless infinite loop
const images = [...originalImages, ...originalImages, ...originalImages];

const SmoothAlternatingSlider = () => {

    const containerRef = useRef(null);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [cursorActive, setCursorActive] = useState(false);
    const hasMovedInside = useRef(false);



    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();


        // ✅ Mark that mouse has moved at least once
        if (!hasMovedInside.current) {
            hasMovedInside.current = true;
            setCursorActive(true);
        }

        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    // const handleMouseEnter = () => {
    //     setCursorActive(true);
    // };

    const handleMouseLeave = () => {
        setCursorActive(false);
        hasMovedInside.current = false;
        // Reset position so it NEVER freezes outside
        setCursorPos({ x: 0, y: 0 });
    };


    const sliderRef = useRef(null);

    /** ----------------------  
      RESPONSIVE DIMENSIONS  
    -----------------------**/
    const isXs = useMediaQuery("(max-width:600px)");
    const isSm = useMediaQuery("(max-width:900px)");

    const ITEM_WIDTH_BIG = isXs ? 180 : isSm ? 250 : 330;
    const ITEM_WIDTH_SMALL = isXs ? 140 : isSm ? 200 : 240;
    const GAP = isXs ? 20 : isSm ? 35 : 50;

    const getItemWidth = (index) =>
        index % 2 === 0 ? ITEM_WIDTH_BIG : ITEM_WIDTH_SMALL;

    const calculateTotal = () =>
        images.reduce((sum, _, i) => sum + getItemWidth(i) + GAP, 0);

    const [offset, setOffset] = useState(0);
    const totalWidth = calculateTotal();

    /** ----------------------------
     SLIDE LOGIC (INFINITE LOOP)
    -----------------------------**/
    const slide = (dir) => {


        // Faster movement ONLY on mobile
        const moveBy = (ITEM_WIDTH_BIG + ITEM_WIDTH_SMALL) / (isXs ? 5 : isSm ? 7 : 5);

        setOffset((prev) => {
            let next = dir === "left" ? prev + moveBy : prev - moveBy;
            const block = totalWidth / 3;

            if (sliderRef.current === null) return prev;

            if (next > -block) {
                sliderRef.current.style.transition = "none";
                const teleported = next - block;

                requestAnimationFrame(() => {
                    setOffset(teleported);
                    requestAnimationFrame(() => {
                        sliderRef.current.style.transition =
                            "transform 0.55s cubic-bezier(.25,.8,.25,1)";
                    });
                });

                return teleported;
            }

            if (next < -block * 2) {
                sliderRef.current.style.transition = "none";
                const teleported = next + block;

                requestAnimationFrame(() => {
                    setOffset(teleported);
                    requestAnimationFrame(() => {
                        sliderRef.current.style.transition =
                            "transform 0.55s cubic-bezier(.25,.8,.25,1)";
                    });
                });

                return teleported;
            }

            return next;
        });
    };

    const isDragging = useRef(false);
    const startX = useRef(0);
    const startOffset = useRef(0);


    /** ----------------------------------
    DRAG / SWIPE SUPPORT (MOUSE + TOUCH)
------------------------------------**/
    useEffect(() => {

        const slider = sliderRef.current;
        if (!slider) return;

        const startDrag = (x) => {
            isDragging.current = true;
            startX.current = x;
            startOffset.current = offset;
            slider.style.transition = "none"; // Disable animation while dragging
        };

        const duringDrag = (x) => {
            if (!isDragging.current) return;
            const diff = x - startX.current;
            setOffset(startOffset.current + diff); // Move slider in real time
        };

        const endDrag = () => {
            if (!isDragging.current) return;
            isDragging.current = false;

            // Smooth back to animation
            slider.style.transition = "transform 0.55s cubic-bezier(.25,.8,.25,1)";

            // Optional: auto-slide after drag release
            // If you want:
            // if (offset < startOffset.current) slide("right");
            // else slide("left");
        };

        // MOUSE EVENTS
        slider.addEventListener("mousedown", (e) => startDrag(e.clientX));
        window.addEventListener("mousemove", (e) => duringDrag(e.clientX));
        window.addEventListener("mouseup", endDrag);

        // TOUCH EVENTS
        slider.addEventListener("touchstart", (e) =>
            startDrag(e.touches[0].clientX)
        );
        window.addEventListener("touchmove", (e) =>
            duringDrag(e.touches[0].clientX)
        );
        window.addEventListener("touchend", endDrag);

        return () => {
            slider.removeEventListener("mousedown", (e) => startDrag(e.clientX));
            window.removeEventListener("mousemove", (e) => duringDrag(e.clientX));
            window.removeEventListener("mouseup", endDrag);

            slider.removeEventListener("touchstart", (e) =>
                startDrag(e.touches[0].clientX)
            );
            window.removeEventListener("touchmove", (e) =>
                duringDrag(e.touches[0].clientX)
            );
            window.removeEventListener("touchend", endDrag);
        };
    }, [offset]);

    /** ----------------------------
      SCROLL MOVEMENT
    -----------------------------**/
    useEffect(() => {
        let last = window.scrollY;
        let lock = false;

        setOffset(-(totalWidth / 3));

        const handleScroll = () => {
            if (lock) return;
            lock = true;

            setTimeout(() => (lock = false), isXs ? 350 : 200);

            const now = window.scrollY;

            if (now < last) slide("left");
            else slide("right");

            last = now;
        };

        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [totalWidth]);

    /** RENDER **/
    return (
        <Box
            ref={containerRef}
            onMouseMove={handleMouseMove}
            // onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                height: isXs ? 200 : isSm ? 200 : 430,
                pt: isXs ? "40px" : "80px",
                pb: isXs ? "40px" : "80px",
                cursor: "none", // 👈 hide default cursor

            }}
        >
            {/* SMILEY */}
            <Box
                component="img"
                src={Smiley}
                sx={{
                    position: "absolute",
                    right: isXs ? 20 : isSm ? 40 : 80,
                    bottom: isXs ? 20 : isSm ? 20 : 58,
                    width: isXs ? 80 : isSm ? 120 : 180,
                    zIndex: 0,
                }}
            />

            {/* SLIDER */}
            <Box
                ref={sliderRef}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${GAP}px`,
                    transform: `translateX(${offset}px)`,
                    transition: "transform 0.55s cubic-bezier(.25,.8,.25,1)",
                    px: isXs ? 1 : 4,
                }}
            >
                {images.map((src, i) => (
                    <Box
                        key={i}
                        sx={{
                            flexShrink: 0,
                            width: getItemWidth(i),
                            height: i % 2 === 0
                                ? (isXs ? 150 : isSm ? 220 : 330)
                                : (isXs ? 120 : isSm ? 170 : 260),
                            overflow: "hidden",
                            borderRadius: "16px",
                        }}
                    >
                        <img
                            src={src}
                            alt=""
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                ))}
            </Box>

            {/* ARROWS */}

            <Box
                sx={{
                    position: "absolute",
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transform: "translate(-50%, -50%)",
                    background: "black",
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none", // VERY IMPORTANT
                    zIndex: 20,
                    // ✨ MAGIC
                    opacity: cursorActive ? 1 : 0,
                    scale: cursorActive ? 1 : 0.8,

                    transition: "opacity 0.25s ease, scale 0.25s ease",
                }}
            >
                <img
                    src={ArrowBackIosNewIcon}
                    style={{
                        width: 20,
                        position: "absolute",
                        left: 8,
                    }}
                />
                <img
                    src={ArrowForwardIosIcon}
                    style={{
                        width: 20,
                        position: "absolute",
                        right: 8,
                    }}
                />
            </Box>


        </Box>
    );
};

export default SmoothAlternatingSlider;
