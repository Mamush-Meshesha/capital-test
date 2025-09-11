import {
  Box,
  Link,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BsFacebook,
  BsLinkedin,
  BsTwitterX,
  BsYoutube,
  BsInstagram,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt,
  BsArrowRight,
} from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const FooterContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #2d3436 0%, #636e72 100%)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(247, 147, 30, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}));

const FooterContent = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
}));

const BrandSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
  fontSize: "2.5rem",
  marginBottom: theme.spacing(2),
  fontFamily: "Inter, sans-serif",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const BrandDescription = styled(Typography)(({ theme }) => ({
  color: "#b2bec3",
  fontSize: "1rem",
  lineHeight: 1.6,
  maxWidth: "300px",
  marginBottom: theme.spacing(3),
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  color: "#b2bec3",
  fontSize: "0.9rem",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ff6b35",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.2rem",
  marginBottom: theme.spacing(2),
  color: "white",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: 0,
    width: "40px",
    height: "3px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    borderRadius: "2px",
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#b2bec3",
  textDecoration: "none",
  fontSize: "0.95rem",
  display: "block",
  padding: theme.spacing(0.5, 0),
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff6b35",
    transform: "translateX(5px)",
  },
}));

const NewsletterContainer = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  padding: theme.spacing(3),
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
}));

const NewsletterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.1rem",
  marginBottom: theme.spacing(1),
  color: "white",
}));

const NewsletterDescription = styled(Typography)(({ theme }) => ({
  color: "#b2bec3",
  fontSize: "0.9rem",
  marginBottom: theme.spacing(2),
  lineHeight: 1.5,
}));

const NewsletterInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: "rgba(255, 255, 255, 0.1)",
    borderRadius: "25px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    color: "white",
    "&:hover": {
      border: "1px solid rgba(255, 107, 53, 0.5)",
    },
    "&.Mui-focused": {
      border: "1px solid #ff6b35",
    },
    "& fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
    "&::placeholder": {
      color: "#b2bec3",
      opacity: 1,
    },
  },
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  borderRadius: "25px",
  padding: "10px 24px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #e55a2b, #e0841a)",
    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
    transform: "translateY(-2px)",
  },
}));

const SocialContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  color: "#b2bec3",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  },
}));

const BottomSection = styled(Box)(({ theme }) => ({
  background: "rgba(0, 0, 0, 0.3)",
  padding: theme.spacing(3, 0),
  marginTop: theme.spacing(4),
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
}));

const BottomContent = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  color: "#b2bec3",
  fontSize: "0.9rem",
}));

const LegalLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
  },
}));

const LegalLink = styled(Link)(({ theme }) => ({
  color: "#b2bec3",
  textDecoration: "none",
  fontSize: "0.9rem",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#ff6b35",
  },
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent maxWidth="xl">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <BrandSection>
              <Logo variant="h3" component="h2">
                PizzaHub
              </Logo>
              <BrandDescription>
                Delivering the finest pizza experience with premium ingredients,
                authentic recipes, and lightning-fast delivery to your doorstep.
              </BrandDescription>
              <ContactInfo>
                <ContactItem>
                  <BsTelephone size={16} />
                  <Typography variant="body2">+251 911 234 567</Typography>
                </ContactItem>
                <ContactItem>
                  <BsEnvelope size={16} />
                  <Typography variant="body2">info@pizzahub.com</Typography>
                </ContactItem>
                <ContactItem>
                  <BsGeoAlt size={16} />
                  <Typography variant="body2">Addis Ababa, Ethiopia</Typography>
                </ContactItem>
              </ContactInfo>
            </BrandSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Box>
              <SectionTitle variant="h6" component="h3">
                Quick Links
              </SectionTitle>
              <Box>
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/menu">Menu</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
                <FooterLink href="/track">Track Order</FooterLink>
              </Box>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={2}>
            <Box>
              <SectionTitle variant="h6" component="h3">
                Customer Service
              </SectionTitle>
              <Box>
                <FooterLink href="/help">Help Center</FooterLink>
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/support">Support</FooterLink>
                <FooterLink href="/feedback">Feedback</FooterLink>
                <FooterLink href="/careers">Careers</FooterLink>
              </Box>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <NewsletterContainer>
              <NewsletterTitle>Stay Updated</NewsletterTitle>
              <NewsletterDescription>
                Subscribe to our newsletter for exclusive deals, new menu items,
                and special offers delivered to your inbox.
              </NewsletterDescription>
              <Box component="form" sx={{ display: "flex", gap: 1 }}>
                <NewsletterInput
                  placeholder="Enter your email"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdEmail color="#b2bec3" />
                      </InputAdornment>
                    ),
                  }}
                />
                <SubscribeButton>
                  Subscribe
                  <BsArrowRight style={{ marginLeft: 4 }} />
                </SubscribeButton>
              </Box>
              <SocialContainer>
                <SocialButton size="small">
                  <BsFacebook />
                </SocialButton>
                <SocialButton size="small">
                  <BsInstagram />
                </SocialButton>
                <SocialButton size="small">
                  <BsTwitterX />
                </SocialButton>
                <SocialButton size="small">
                  <BsYoutube />
                </SocialButton>
                <SocialButton size="small">
                  <BsLinkedin />
                </SocialButton>
              </SocialContainer>
            </NewsletterContainer>
          </Grid>
        </Grid>

        <BottomSection>
          <BottomContent>
            <CopyrightText>
              &copy; {new Date().getFullYear()} PizzaHub. All rights reserved.
            </CopyrightText>
            <LegalLinks>
              <LegalLink href="/privacy">Privacy Policy</LegalLink>
              <LegalLink href="/terms">Terms of Service</LegalLink>
              <LegalLink href="/cookies">Cookie Policy</LegalLink>
              <LegalLink href="/refund">Refund Policy</LegalLink>
            </LegalLinks>
          </BottomContent>
        </BottomSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
