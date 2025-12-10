import React, { useRef, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import smilePhoto from "../../assets/smilephoto.svg";
import electric from "../../assets/electric.svg";
import heroVideo from "../../assets/video.mp4";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
    const marqueeRef = useRef(null);
    const videoRef = useRef(null);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",

                py: 20,
            }}
        >
            {/* TOP-LEFT LARGE IMAGE */}
            <Box
                sx={{
                    position: "absolute",
                    top: "-40px",
                    left: "-40px",
                    width: { xs: "130px", md: "220px" },
                    opacity: 0.9,
                }}
            >
                <img src={smilePhoto} width="100%" alt="smile" />
            </Box>

            {/* BOTTOM-RIGHT LARGE IMAGE */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: "-60px",
                    right: "-60px",
                    width: { xs: "150px", md: "250px" },
                    opacity: 0.9,
                }}
            >
                <img src={electric} width="100%" alt="electric" />
            </Box>

            {/* CENTER VIDEO (overlay above slider) */}
            <Box
                ref={videoRef}
                sx={{
                    position: "relative",
                    width: { xs: "90%", md: "720px" },
                    mx: "auto",
                    zIndex: 3,
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
                }}
            >
                <video
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    style={{
                        width: "100%",
                        display: "block",
                        objectFit: "cover",
                    }}
                />
            </Box>

            {/* MARQUEE TEXT SLIDER */}
            <Box
                ref={marqueeRef}
                sx={{
                    mt: 8,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Typography
                    sx={{
                        display: "inline-block",
                        whiteSpace: "nowrap",
                        fontSize: "25px",
                        fontWeight: 500,
                        color: "#000",
                        fontFamily: "Inter Tight, sans-serif",
                        animation: "marquee 12s linear infinite",
                    }}
                >
                    Culture / Innovation / Design / Branding / Innovation / Design / Branding / Strategy /
                    &nbsp; Culture / Innovation / Design / Branding / Innovation / Design /  &nbsp; Culture / Innovation / Design / Branding / Innovation / Design /  &nbsp; Culture / Innovation / Design / Branding / Innovation / Design /  &nbsp; Culture / Innovation / Design / Branding / Innovation / Design /
                </Typography>
            </Box>

            {/* SCROLLING ANIMATION KEYFRAMES */}
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                `}
            </style>
        </Box>
    );
};

export default VideoSection;
