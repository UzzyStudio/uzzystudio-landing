import React, { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useMediaQuery,
    keyframes,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import Logo from "../../assets/logo.svg fill.svg";

const menuItems = ["Vision", "Services", "Cases"];

const slideDownFast = keyframes`
  0% {
    transform: translateY(-60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const isMobile = useMediaQuery("(max-width:1124px)");

    // Scroll handler for hide/show header
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setShowHeader(false);
            } else {
                // Scrolling up
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <AppBar
            elevation={0}
            sx={{
                backgroundColor: "transparent",
                position: "fixed", // fixed works better than sticky for this effect
                top: 0,
                width: "100%",
                maxWidth: "1600px",
                margin: "auto",
                paddingX: 6,
                paddingY: 1,
                transition: "transform 0.3s ease",
                transform: showHeader ? "translateY(0)" : "translateY(-120px)", // hide when scrolling down
                zIndex: 100,
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    animation: `${slideDownFast} 0.7s ease-out`,
                    animationFillMode: "forwards",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginLeft: "auto" }}>
                    {/* Logo */}
                    <Box
                        sx={{
                            width: "46px",
                            height: "46px",
                            backgroundColor: "#EEEEEE",
                            borderRadius: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={Logo} alt="Logo" width="40" height="40" />
                    </Box>

                    {/* Desktop Menu */}
                    {!isMobile && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 20 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "center",
                                    backgroundColor: "#EEEEEE",
                                    borderRadius: "50px",
                                    padding: "12px 34px",
                                }}
                            >
                                {menuItems.map((item) => (
                                    <Box
                                        key={item}
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: 900,
                                            color: "#1D1D1B",
                                            cursor: "pointer",
                                            borderRadius: "12px",
                                            fontFamily: "Inter Tight, sans-serif",
                                            "&:hover": { backgroundColor: "#E5E5E5" },
                                        }}
                                    >
                                        {item}
                                    </Box>
                                ))}
                            </Box>

                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#CAF55E",
                                    color: "#1D1D1B",
                                    borderRadius: "30px",
                                    padding: "9px 18px",
                                    fontSize: "15px",
                                    fontWeight: 900,
                                    fontFamily: "Inter Tight, sans-serif",
                                    boxShadow: "none",
                                    textTransform: "none",
                                    "&:hover": {
                                        backgroundColor: "#B6E450",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                start a project
                            </Button>
                        </Box>
                    )}

                    {/* Mobile Menu Toggle */}
                    {isMobile && (
                        <IconButton onClick={() => setDrawerOpen(true)}>
                            <MenuIcon sx={{ color: "#1D1D1B" }} />
                        </IconButton>
                    )}
                </Box>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box sx={{ width: 250, padding: 2 }}>
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ alignSelf: "flex-end" }}>
                        <CloseIcon />
                    </IconButton>

                    <List>
                        {menuItems.map((item) => (
                            <ListItem key={item} disablePadding>
                                <ListItemButton onClick={() => setDrawerOpen(false)}>
                                    <ListItemText
                                        primary={item}
                                        primaryTypographyProps={{
                                            fontWeight: 900,
                                            fontSize: "16px",
                                            fontFamily: "Inter Tight, sans-serif",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{ padding: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: "#CAF55E",
                                color: "#1D1D1B",
                                borderRadius: "30px",
                                fontWeight: 900,
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "#B6E450",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            start a project
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Header;
