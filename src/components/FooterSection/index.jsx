import { Box, Grid, Typography, Button } from "@mui/material";
import BigLogo from "../../assets/bigLogoFooter.svg";
import RandomImg from "../../assets/randomimg.svg";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export default function FooterSection() {
    const sectionRef = useRef(null);
    const menuRef = useRef(null);
    const logoRef = useRef(null);
    const buttonRef = useRef(null);
    const randomRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // MENU — slide down
            gsap.from(menuRef.current, {
                y: -60,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",  // when section enters view
                }
            });

            // BIG LOGO — left to right
            gsap.from(logoRef.current, {
                x: -120,
                opacity: 0,
                duration: 1.4,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // BUTTON — bottom to top
            gsap.from(buttonRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.3,
                delay: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

            // RANDOM IMG — bottom to top + slight rotate
            gsap.from(randomRef.current, {
                y: 80,
                opacity: 0,
                rotate: 8,
                duration: 1.4,
                delay: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Box
            component="section"
            ref={sectionRef}
            sx={{
                width: "100%",
                color: "#fff",
                fontFamily: "Inter Tight, sans-serif",
            }}
        >
            {/* INNER CONTAINER */}
            <Box sx={{
                maxWidth: "1600px", width: "95%", paddingTop: "35px", mx: "auto", px: 2, backgroundColor: "#1D1D1B", borderTopLeftRadius: "20px", borderTopRightRadius: "20px"
            }}>

                {/* ========== ROW 1 — MENU ========== */}
                <Grid ref={menuRef}
                    container
                    sx={{
                        mb: 8,
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>

                    {/* LEFT MENU — 3 ITEMS */}
                    <Grid item >
                        <Grid container spacing={4} sx={{ marginLeft: "80px" }}>
                            {["Vision", "Cases", "Services"].map((item, i) => (
                                <Grid item key={i} >
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: 500,
                                            cursor: "pointer",
                                            fontFamily: "Inter Tight, sans-serif",
                                            "&:hover": { opacity: 0.6 },
                                            textTransform: "Lowercase",
                                            marginLeft: "20px"
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* RIGHT MENU — 2 ITEMS */}
                    <Grid item>
                        <Grid container spacing={4} sx={{ marginRight: "80px" }}>
                            {["Behance", "Instagram"].map((item, i) => (
                                <Grid item key={i}>
                                    <Typography
                                        sx={{
                                            fontSize: "13px",
                                            fontWeight: 500,
                                            color: "#fff",
                                            fontFamily: "Inter Tight, sans-serif",
                                            cursor: "pointer",
                                            "&:hover": { opacity: 0.6 },
                                            textTransform: "Uppercase",
                                            marginRight: "20px"
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container alignItems="center" spacing={4} sx={{ width: "100%" }}>
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",   // flush to bottom
                            height: "100%",
                        }}
                    >
                        {/* CENTER — BUTTON */}
                        <Grid
                            sx={{ textAlign: "center", position: "relative", top: "170px", left: "791px", zIndex: "2" }}
                        >
                            <Button
                                ref={buttonRef}
                                sx={{
                                    px: 4,
                                    py: 3,
                                    borderRadius: "40px",
                                    backgroundColor: "#CAF55E",
                                    color: "#1D1D1B",
                                    fontSize: "15px",
                                    fontWeight: 700,
                                    fontFamily: "Inter Tight, sans-serif",
                                    transform: "rotate(-20deg)",   // slight left tilt
                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.12)",
                                    textTransform: "lowercase",   // small letters
                                    transition: "0.25s ease",

                                    "&:hover": {
                                        backgroundColor: "#d4ff74",
                                        transform: "rotate(0deg) scale(1.03)", // hover correction + pop
                                    },
                                }}
                            >
                                Let’s Work Together
                            </Button>
                        </Grid>

                        {/* RIGHT — RANDOM IMAGE */}
                        <Grid ref={randomRef}

                            sx={{ textAlign: "center", position: "relative", top: "214px", left: "790px" }}
                        >
                            <img
                                src={RandomImg}
                                alt="random"
                                style={{ width: "75px", height: "auto", }}
                            />
                            <Typography sx={{
                                fontSize: "15px", fontFamily: "Inter Tight, sans-serif", marginTop: "30px"
                            }}>
                                project@uzzystudio.com
                            </Typography>
                        </Grid>

                    </Grid>
                </Grid>

                {/* ========== ROW 2 — MAIN CONTENT ========== */}
                <Grid container alignItems="center" spacing={4}>
                    {/* LEFT — BIG LOGO ONLY */}
                    <Grid
                        item
                        xs={12}
                        md={10}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",   // flush to bottom
                            height: "100%",

                        }}
                    >
                        <img
                            ref={logoRef}
                            src={BigLogo}
                            alt="big logo"
                            style={{
                                width: "100%",
                                maxWidth: "1300px",
                                marginBottom: 0,
                                marginLeft: "-20px"
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
