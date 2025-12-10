import React from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Stack,
    Chip,
} from "@mui/material";
import { useState } from "react";
import CharacterContact from "../../assets/character-contact.svg";
import RatingImg from "../../assets/rating.png";
import BehanceLogo from "../../assets/Behance.svg";
import DribbbleLogo from "../../assets/dribble.svg";
import InstagramLogo from "../../assets/dribble.svg";

export default function ContactSection() {

    const [selectedServices, setSelectedServices] = React.useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);


    const toggleService = (service) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const services = [
        "Logo Design",
        "App from Scratch",
        "UI/UX Design",
        "Branding",
        "Site from Scratch",
        "App Development",
        "Web Development",
    ];

    const budgets = [
        "$200 - $500",
        "$500 - $1,000",
        "$1,000 - $3,000",
        "$3,000 - $5,000",
        "$5,000+",
    ];

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                py: 12,
                px: { xs: 2, md: 6 },
                width: "100%"
            }}
        >
            {/* INNER BOX */}
            <Box sx={{
                maxWidth: "1600px",
                mx: "auto",
            }}>
                <Grid container spacing={15} alignItems="flex-start" wrap="nowrap">

                    {/* LEFT COLUMN */}
                    <Grid item xs={12} md={4} sx={{ minWidth: 0 }}>
                        <Box>
                            {/* HEADLINE */}
                            <Typography
                                sx={{
                                    fontSize: { xs: "32px", md: "42px" },
                                    fontFamily: "Inter Tight, sans-serif",
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    color: "black",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    alignItems: "center",
                                }}
                            >
                                Have{" "}
                                <Box
                                    component="img"
                                    src={CharacterContact}
                                    alt="character"
                                    sx={{
                                        height: "34px",
                                        mx: 1,
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                    }}
                                />
                                a great idea?
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 2,
                                    fontSize: "22px",
                                    fontWeight: 400,
                                    fontFamily: "Inter Tight, sans-serif",

                                    color: "black",
                                }}
                            >
                                Tell us about it
                            </Typography>

                            {/* RATING */}
                            <Box
                                component="img"
                                src={RatingImg}
                                alt="rating"
                                sx={{ width: "180px", mt: 3 }}
                            />

                            {/* CLIENT TRUST US */}
                            <Typography
                                sx={{
                                    mt: 0, mb: 8, fontWeight: 600, color: "black", fontFamily: "Inter Tight, sans-serif",
                                }}
                            >
                                Client trust us
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 0, mb: 1, fontWeight: 500, color: "black", fontFamily: "Inter Tight, sans-serif",
                                }}
                            >
                                Follow Us
                            </Typography>
                            {/* SOCIALS */}
                            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                                <Box
                                    component="img"
                                    src={BehanceLogo}
                                    alt="Behance"
                                    sx={{ height: "45px" }}
                                />
                                <Box
                                    component="img"
                                    src={DribbbleLogo}
                                    alt="Dribbble"
                                    sx={{ height: "45px" }}
                                />
                                <Box
                                    component="img"
                                    src={InstagramLogo}
                                    alt="Instagram"
                                    sx={{ height: "45px" }}
                                />
                            </Stack>

                            {/* EMAIL */}
                            <Typography
                                sx={{
                                    mt: 5,
                                    fontSize: "20px",
                                    fontWeight: 500,
                                    color: "black",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                info@uzzy.design
                            </Typography>
                        </Box>
                    </Grid>

                    {/* RIGHT COLUMN (FORM) */}
                    {/* RIGHT COLUMN (FORM) */}
                    <Grid item xs={12} md={7} sx={{ minWidth: 0, display: "flex", justifyContent: "center" }}>
                        <Box sx={{ width: "100%", maxWidth: "620px" }}>
                            {/* NAME FIELDS */}
                            <Grid container spacing={3}>
                                {/* NAME & COMPANY */}
                                <Grid item xs={12} md={6} sm={6} width={"47%"}>
                                    <Typography sx={{ mb: 1, fontWeight: 500, color: "#000", fontFamily: "Inter Tight, sans-serif", fontSize: "15px" }}>
                                        Name & Company
                                    </Typography>

                                    <TextField
                                        placeholder="Enter your name & company"
                                        fullWidth
                                        variant="outlined"
                                        inputProps={{
                                            style: {
                                                fontSize: "14px",
                                                fontFamily: "Inter Tight, sans-serif",
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontFamily: "Inter Tight, sans-serif",
                                                fontSize: "14px",
                                            }
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0px",
                                                "& input::placeholder": {
                                                    fontSize: "14px",
                                                    fontFamily: "Inter Tight, sans-serif",
                                                    opacity: 0.5,  // important for Chrome!
                                                },
                                            },
                                        }}
                                    />

                                </Grid>

                                {/* EMAIL */}
                                <Grid item xs={12} md={6} sm={6} width={"47%"}>
                                    <Typography sx={{ mb: 1, fontWeight: 500, color: "#000", fontFamily: "Inter Tight, sans-serif", fontSize: "15px" }}>
                                        Email
                                    </Typography>

                                    <TextField
                                        placeholder="Enter your email"
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                fontSize: "13px",
                                                "&::placeholder": {
                                                    fontSize: "13px",
                                                    fontFamily: "Inter Tight, sans-serif",

                                                },
                                            },
                                        }}

                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "0px",
                                                "& input::placeholder": {
                                                    fontSize: "14px",
                                                    fontFamily: "Inter Tight, sans-serif",
                                                    opacity: 0.5,
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                            </Grid>


                            {/* SERVICES */}
                            <Box sx={{ mt: 4 }}>
                                <Typography sx={{ fontWeight: 500, mb: 1, color: "#000", fontFamily: "Inter Tight, sans-serif", fontSize: "15px" }}>
                                    I'm interested in...
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                                    {services.map((item) => (
                                        <Chip
                                            key={item}
                                            label={item}
                                            onClick={() => toggleService(item)}
                                            sx={{
                                                borderRadius: "80px",
                                                px: 2.2,
                                                py: 3,
                                                fontSize: "14px",
                                                cursor: "pointer",
                                                backgroundColor: selectedServices.includes(item) ? "black" : "transparent",
                                                color: selectedServices.includes(item) ? "white" : "black",
                                                border: "1px solid #e0e0e0",
                                                "&:hover": {
                                                    backgroundColor: selectedServices.includes(item) ? "black" : "#f4f4f4",
                                                },
                                            }}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            {/* BUDGET */}
                            <Box sx={{ mt: 4 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        mb: 1,
                                        fontFamily: "Inter Tight, sans-serif",
                                        fontSize: "15px",
                                        color: "#000"
                                    }}
                                >
                                    Project budget (USD)
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                                    {budgets.map((item) => {
                                        const isSelected = selectedBudget === item;

                                        return (
                                            <Chip
                                                key={item}
                                                label={item}
                                                onClick={() => setSelectedBudget(isSelected ? null : item)}
                                                sx={{
                                                    borderRadius: "80px",
                                                    px: 2.2,
                                                    py: 3,
                                                    cursor: "pointer",
                                                    fontSize: "14px",
                                                    backgroundColor: isSelected ? "#000" : "transparent",
                                                    color: isSelected ? "#fff" : "#000",
                                                    border: isSelected
                                                        ? "1px solid #000"
                                                        : "1px solid #e0e0e0",
                                                    transition: "all 0.2s ease",
                                                    "&:hover": {
                                                        backgroundColor: isSelected ? "#000" : "#f5f5f5",
                                                    }
                                                }}
                                            />
                                        );
                                    })}
                                </Box>
                            </Box>


                            {/* MESSAGE FIELD */}
                            <Box sx={{ mt: 4 }}>
                                <TextField
                                    label="Tell us more about your project"
                                    fullWidth
                                    multiline
                                    minRows={5}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "0px",
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontFamily: "Inter Tight, sans-serif",
                                            fontSize: "14px",
                                        }
                                    }}
                                />
                            </Box>

                            {/* SUBMIT BUTTON */}
                            <Box sx={{ mt: 4 }}>
                                <Button

                                    variant="contained"
                                    sx={{
                                        py: 1.6,
                                        px: 7,
                                        backgroundColor: "black",
                                        color: "white",
                                        fontFamily: "Inter Tight, sans-serif",
                                        borderRadius: "80px",
                                        fontWeight: 400,
                                        textTransform: "none",
                                        fontSize: "14px",
                                        "&:hover": {
                                            backgroundColor: "#111",
                                        },
                                    }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box >
    );
}
