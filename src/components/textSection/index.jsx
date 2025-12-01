import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import "./style.css";

import RandomDoodle from "../../assets/random.svg";
import ZigZagDoodle from "../../assets/zigzag.svg";
import HeartDoodle from "../../assets/heart.svg";
import BlinkFace from "../../assets/blink face.svg";


/* -----------------------------
   TEXT LINES + INDENTS
--------------------------------*/
const LINES = [
    { text: "Rooted in Creativity", indent: 0 },
    { text: "we design emotions", indent: 0 },
    { text: "and build digital", indent: 40 },
    { text: "experiences", indent: 80 },
    { text: "that excite,", indent: 120 },
    { text: "drive ideas, and", indent: 80 },
    { text: "make people go,", indent: 40 },
    { text: "'Damn.'", indent: 160 },
];

// Split each line into characters (preserve spaces)
const LINES_CHARS = LINES.map((line) =>
    line.text.split("").map((c) => (c === " " ? "\u00A0" : c))
);

// Calculate global character offsets
const LINE_OFFSETS = [];
let TOTAL_CHARS = 0;

LINES_CHARS.forEach((chars, idx) => {
    LINE_OFFSETS[idx] = TOTAL_CHARS;
    TOTAL_CHARS += chars.length;
});

/* -----------------------------
   MAIN COMPONENT
--------------------------------*/
const CreativeTextSection = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");


    const containerRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const rect = el.getBoundingClientRect();
            const winHeight = window.innerHeight;

            // ❗ Custom trigger point: 35% between top and center
            const trigger = rect.top + rect.height * 0.20;

            // Map trigger to progress
            let p = 1 - trigger / winHeight;

            // Clamp
            p = Math.max(0, Math.min(15, p));
            setProgress(p);
        };



        handleScroll();
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <Box
            component="section"
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",

            }}>
            <Box
                ref={containerRef}
                sx={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    padding: "0px 0px 350px 0px",
                }}
            >
                {/* DOODLES */}
                <Doodle src={HeartDoodle} sx={{ top: "19%", left: "79%", width: "92px" }} />
                <Doodle src={ZigZagDoodle} sx={{ top: "43%", left: "31%", width: "570px" }} />
                <Doodle src={RandomDoodle} sx={{ top: "64%", left: "41%", width: "365px" }} />

                {/* TEXT */}
                <Box sx={{
                    position: "relative", zIndex: 5, maxWidth: "1200px",
                    mx: "auto"
                }}>
                    {LINES.map((line, i) => renderLine(i, progress))}
                </Box>
            </Box >
            <Box>
                {/* END SECTION: Image + Text */}
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mt: 10,
                        justifyContent: "end",
                        alignItems: "end",
                        position: "relative",
                        bottom: "286px",
                    }}
                >
                    {/* IMAGE */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                alignItems: "end",
                            }}
                        >
                            <img
                                src={BlinkFace}
                                alt="Blink Face"
                                style={{
                                    width: isMobile ? "80px" : "120px",
                                    height: "auto",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* TEXT */}
                    <Grid size={{ xs: 12, md: 5 }}
                        container
                        spacing={2}
                        sx={{
                            position: "relative",
                            top: 0,
                            right: "170px",
                            mt: 10,
                            justifyContent: "end",
                            alignItems: "end",
                        }}
                    >
                        <Box>
                            <Typography
                                sx={{
                                    textAlign: isMobile ? "center" : "right",
                                    pr: isMobile ? 0 : "-1px",
                                    fontFamily: "Inter Tight",
                                    fontSize: isMobile ? "10px" : "13px",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    color: "#1D1D1B",
                                    lineHeight: 1.4,
                                }}
                            >
                                WE ARE THE AGENCY <br />
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: "Inter Tight",
                                    fontSize: isMobile ? "10px" : "13px",
                                    fontWeight: 900,
                                    textTransform: "uppercase",
                                    color: "#1D1D1B",
                                    lineHeight: 1.4,
                                }}
                            >
                                THAT RUNS ON DEEP INSIGHTS <br />
                                PURE EMOTIONS AND BOLD IDEAS <br />
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

/* -----------------------------
   DOODLE COMPONENT
--------------------------------*/
const Doodle = ({ src, sx }) => (
    <Box
        component="img"
        src={src}
        sx={{
            position: "absolute",
            opacity: 0.8,
            zIndex: 1,
            pointerEvents: "none",
            ...sx,
        }}
    />
);

/* -----------------------------
   RENDER ONE LINE
--------------------------------*/
const FADE_WINDOW = 20;

const renderLine = (lineIndex, progress) => {
    const chars = LINES_CHARS[lineIndex];
    const baseOffset = LINE_OFFSETS[lineIndex];
    const indent = LINES[lineIndex].indent;

    // ✅ Delay start: require progress to pass 0.25 first
    const letterProgress = progress * TOTAL_CHARS;

    return (
        <Typography
            key={lineIndex}
            variant="h2"
            sx={{
                fontFamily: "Inter Tight",
                fontSize: "120px",
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: "-3.3px",
                display: "block",
                textAlign: "center",
                marginBottom: "-25px",
                marginLeft: `${indent}px`,
                whiteSpace: "pre-wrap",
            }}
        >
            {chars.map((char, i) => {
                const globalIndex = baseOffset + i;

                const MIN_OPACITY = 0.10;

                const delta = letterProgress - globalIndex;
                let opacity = delta / FADE_WINDOW;

                // clamp between MIN_OPACITY → 1 instead of 0 → 1
                opacity = Math.max(MIN_OPACITY, Math.min(1, opacity));


                return (
                    <span
                        key={i}
                        style={{
                            opacity,
                            transition: "opacity 0.8s ease-out",
                            display: "inline-block",
                            color: "#121314",
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </Typography>
    );
};

export default CreativeTextSection;
