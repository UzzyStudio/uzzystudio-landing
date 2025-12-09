import React, { useRef, useEffect } from "react";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import "./style.css";
import bigLogo from '../../assets/bigLogoFooter.svg';
import randomImg from '../../assets/randomimg.svg';

export default function FooterSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");
                    }
                });
            },
            { threshold: 0.25 }
        );

        const elements = sectionRef.current.querySelectorAll(".animate-item");
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <Box
            ref={sectionRef}
            sx={{
                width: "100%",
                maxWidth: "1600px",
                mx: "auto",
                background: "#121314",
                color: "#fff",
                px: { xs: 2, sm: 4, md: 8 },
                py: { xs: 4, sm: 6, md: 10 },
                overflowX: "hidden" // ★ fixes horizontal scroll
            }}
        >
            {/* Top Menu */}
            <Grid container justifyContent="space-between" alignItems="center">
                {/* Left Menu */}
                <Grid item>
                    <Stack direction="row" spacing={{ xs: 2, sm: 4 }} className="animate-item">
                        <Typography sx={{ cursor: "pointer" }}>vision</Typography>
                        <Typography sx={{ cursor: "pointer" }}>cases</Typography>
                        <Typography sx={{ cursor: "pointer" }}>services</Typography>
                    </Stack>
                </Grid>

                {/* Right Menu */}
                <Grid item>
                    <Stack direction="row" spacing={{ xs: 2, sm: 4 }} className="animate-item">
                        <Typography sx={{ cursor: "pointer" }}>BEHANCE</Typography>
                        <Typography sx={{ cursor: "pointer" }}>INSTAGRAM</Typography>
                    </Stack>
                </Grid>
            </Grid>

            {/* Main Content */}
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: { xs: 6, sm: 8, md: 12 } }}
            >
                {/* Logo + Button */}
                <Grid item sx={{ position: "relative" }}>
                    {/* Logo grows in */}
                    <img
                        src={bigLogo}
                        alt="Big Logo"
                        className="animate-item"
                        style={{
                            width: "900px",
                            height: "auto",
                            transform: "scale(0.5)",
                            opacity: 1,
                        }}
                    />

                    <Button
                        className="animate-item"
                        variant="contained"
                        sx={{
                            position: "absolute",
                            top: { xs: "100%", sm: "20px" },
                            right: { xs: "0", sm: "-60px" },
                            mt: { xs: 2, sm: 0 },
                            bgcolor: "#A5FF3D",
                            color: "#121314",
                            fontWeight: 700,
                            px: 3,
                            py: 1,
                            borderRadius: "30px",
                            textTransform: "none",
                        }}
                    >
                        Let's work together
                    </Button>
                </Grid>

                {/* Small Image */}
                <Grid item>
                    <img
                        src={randomImg}
                        alt="Random"
                        className="animate-item"
                        style={{
                            width: "250px",
                            height: "auto",
                            opacity: 0,
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
