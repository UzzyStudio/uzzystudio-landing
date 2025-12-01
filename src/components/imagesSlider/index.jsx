import { Box } from "@mui/material";
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

const ITEM_WIDTH_BIG = 330;
const ITEM_WIDTH_SMALL = 240;
const GAP = 50;

// Alternating size
const getItemWidth = (index) =>
    index % 2 === 0 ? ITEM_WIDTH_BIG : ITEM_WIDTH_SMALL;

// Total width of ALL items
const calculateTotal = () =>
    images.reduce((sum, _, i) => sum + getItemWidth(i) + GAP, 0);

const SmoothAlternatingSlider = () => {

    const sliderRef = useRef(null);

    const [offset, setOffset] = useState(0);
    const totalWidth = calculateTotal();

    /** SLIDE LOGIC (INFINITE LOOP WITHOUT GAPS) */
    const slide = (dir) => {
        const moveBy = (ITEM_WIDTH_BIG + ITEM_WIDTH_SMALL) / 5;

        setOffset((prev) => {
            let next = dir === "left" ? prev + moveBy : prev - moveBy;

            const block = totalWidth / 3;

            // Too far RIGHT (need to loop to center)
            if (next > -block) {
                // TEMPORARILY disable animation for teleport
                sliderRef.current.style.transition = "none";

                const teleported = next - block;

                // TELEPORT instantly
                requestAnimationFrame(() => {
                    setOffset(teleported);

                    // RESTORE smooth animation after teleport
                    requestAnimationFrame(() => {
                        sliderRef.current.style.transition =
                            "transform 0.55s cubic-bezier(.25,.8,.25,1)";
                    });
                });

                return teleported;
            }

            // Too far LEFT (need to loop to center)
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


    /** SCROLL MOVEMENT */
    useEffect(() => {
        let last = window.scrollY;
        let lock = false;

        // Start in the MIDDLE block
        setOffset(-(totalWidth / 3));

        const handleScroll = () => {
            if (lock) return;
            lock = true;

            setTimeout(() => (lock = false), 200);

            const now = window.scrollY;

            if (now < last) slide("left");
            else slide("right");

            last = now;
        };

        window.addEventListener("wheel", handleScroll);
        return () => window.removeEventListener("wheel", handleScroll);
    }, [totalWidth]);

    return (
        <Box
            sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                height: 430,
                padding: "80px 0px",
            }}
        >
            {/* SMILEY  */}
            <Box
                component="img"
                src={Smiley}
                sx={{
                    position: "absolute",
                    right: 80,
                    bottom: 58,
                    width: 180,
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
                    px: 4,
                }}
            >
                {images.map((src, i) => (
                    <Box
                        key={i}
                        sx={{
                            flexShrink: 0,
                            width: getItemWidth(i),
                            height: i % 2 === 0 ? 330 : 260,
                            overflow: "hidden",
                            borderRadius: "18px",
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
                    top: "16%",
                    left: "48%",
                    transform: "translate(-50%, -50%)",
                    background: "black",
                    width: 58,
                    height: 58,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={ArrowBackIosNewIcon}
                    onClick={() => slide("left")}
                    style={{
                        width: 22,
                        position: "absolute",
                        left: 8,
                        cursor: "pointer",
                    }}
                />

                <img
                    src={ArrowForwardIosIcon}
                    onClick={() => slide("right")}
                    style={{
                        width: 22,
                        position: "absolute",
                        right: 8,
                        cursor: "pointer",
                    }}
                />
            </Box>
        </Box>
    );
};

export default SmoothAlternatingSlider;
