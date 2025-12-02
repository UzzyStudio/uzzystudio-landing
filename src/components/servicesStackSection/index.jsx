import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import img2 from "../../assets/img2.png";

// Shared description text for all sections
const DESCRIPTION =
    "Know your spot. Set your sights. Plan your path. A solid strategy keeps us grounded and focused, making sure every move we make hits the mark and stays true to what we stand for.";

// Master Services Array
const SERVICES = [
    {
        title: "Strategy",
        bg: "#ffffff",
        img: img2,
        points: [
            "Positioning",
            "Brand Workshop",
            "Insights",
            "Purpose Code",
            "Brand Name",
            "Communication Strategy",
            "Strategic Consulting",
            "Brand Claim",
        ],
    },
    {
        title: "Branding",
        bg: "#CAF55E",
        img: img2,
        points: [
            "Art Direction",
            "Visual Identity",
            "Concept Development",
            "Brand Guidelines",
            "Typography",
            "Illustrations",
            "Brand Storytelling",
            "Employer Branding",
        ],
    },
    {
        title: "Digital",
        bg: "#ffffff",
        img: img2,
        points: [
            "Webflow Development",
            "Web Design",
            "UX/UI Design",
            "SEO",
            "Style Guide",
            "Storytelling",
            "Digital Branding",
        ],
    },
    {
        title: "Webflow",
        bg: "#CAF55E",
        img: img2,
        points: [
            "Micro Interactions",
            "Responsive Design",
            "CMS Integration",
            "Custom Code",
            "SEO Optimization",
            "Performance Tuning",
            "E-commerce",
        ],
    },
    {
        title: "Creative Direction",
        bg: "#ffffff",
        img: img2,
        points: [
            "Campaign Concepts",
            "Art Direction",
            "Photography Direction",
            "Video Direction",
            "Creative Strategy",
            "Messaging Frameworks",
        ],
    },
    {
        title: "Marketing",
        bg: "#CAF55E",
        img: img2,
        points: [
            "Social Media Strategy",
            "Paid Campaigns",
            "Content Planning",
            "Copywriting",
            "Analytics",
            "Growth Strategy",
        ],
    },
];

const ServicesStackSection = () => {
    const wrapperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!wrapperRef.current) return;

            const rect = wrapperRef.current.getBoundingClientRect();
            const screenH = window.innerHeight;

            const progress = Math.min(
                Math.max(0, screenH - rect.top),
                screenH * SERVICES.length
            );

            const newIndex = Math.floor(progress / screenH);

            if (newIndex !== activeIndex && newIndex < SERVICES.length) {
                setActiveIndex(newIndex);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [activeIndex]);

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                height: `${SERVICES.length * 100}vh`,
                borderTop: "2px solid #D8D8D8",
                borderBottom: "2px solid #D8D8D8",
                marginBottom: "100px",
            }}
            ref={wrapperRef}
        >
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    height: "95vh",
                    overflow: "hidden",
                }}
            >
                {SERVICES.map((service, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: service.bg,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0px 80px",
                            color: "#1D1D1B",
                            // transition: "opacity 0.6s ease, transform 0.6s ease",
                            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
                            opacity: activeIndex === index ? 1 : 0,
                            transform:
                                activeIndex === index ? "translateY(0px)" : "translateY(40px)",
                            pointerEvents: activeIndex === index ? "auto" : "none",
                        }}>
                        {/* LEFT COLUMN */}
                        <Box
                            sx={{
                                pr: 8,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around",
                                height: "100%",        // Ensures full column spacing works
                            }}
                        >
                            {/* TOP: Heading + Description */}
                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "30px",
                                        fontFamily: "Inter Tight, sans-serif",
                                        letterSpacing: "-1.1px",
                                        fontWeight: 800,
                                        textTransform: "lowercase",
                                        mb: 1,
                                    }}
                                >
                                    {service.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontFamily: "Inter Tight, sans-serif",
                                        letterSpacing: "0px",
                                        mb: 3,
                                        maxWidth: "420px",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {DESCRIPTION}
                                </Typography>
                            </Box>

                            {/* BOTTOM: Button */}
                            <Box
                                sx={{
                                    mt: 4,
                                    display: "flex",
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 3,
                                        py: 2.2,
                                        background: "#fff",
                                        borderRadius: "30px",
                                        display: "inline-block",
                                        color: "#111",
                                        fontWeight: 700,
                                        backgroundColor: "#EEEEEE",
                                        cursor: "pointer",
                                        fontFamily: "Inter Tight, sans-serif",
                                    }}
                                >
                                    let's work together
                                </Box>
                            </Box>
                        </Box>


                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end", justifyContent: "flex-end", height: "70%" }}
                        >
                            {/* BULLETS */}
                            <Box>
                                {service.points.map((p, i) => (
                                    <Typography
                                        key={i}
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: 400,
                                            fontFamily: "Inter Tight, sans-serif",
                                            lineHeight: 1.5,
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        → {p}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>

                        {/* RIGHT COLUMN */}
                        <Box
                            sx={{

                                display: "flex",
                                flexDirection: "column",
                                gap: 3,
                            }}
                        >
                            {/* IMAGE */}
                            <Box sx={{ width: "100%" }}>
                                <img
                                    src={service.img}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "8px",
                                        objectFit: "cover",
                                    }}
                                    alt=""
                                />
                            </Box>

                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default ServicesStackSection;
