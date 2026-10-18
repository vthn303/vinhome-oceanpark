import React from "react";
import {
	Box,
	Container,
	Typography,
	IconButton,
	Link,
	Grid,
} from "@mui/material";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import MusicNoteIcon from "@mui/icons-material/MusicNote"; // TikTok representation
import Logo from "./Logo";

export default function Footer() {
	const socialIcons = [
		{ icon: <FacebookIcon fontSize="small" />, href: "#" },
		{ icon: <YouTubeIcon fontSize="small" />, href: "#" },
		{ icon: <MusicNoteIcon fontSize="small" />, href: "#" },
		{ icon: <LanguageIcon fontSize="small" />, href: "#" },
	];

	return (
		<Box component="footer" sx={{ width: "100%", mt: "auto" }}>
			{/* Upper Footer Bar */}
			<Box
				sx={{
					background: 'linear-gradient(90deg, #2A52BE 0%, #00B4D8 100%)',
					color: "#ffffff",
					py: { xs: 4, md: 5 },
					px: { xs: 2, md: 4 },
				}}
			>
				<Container maxWidth="xl" disableGutters>
					<Grid
						container
						spacing={{ xs: 4, md: 5 }}
            alignItems="flex-start"
					>
						{/* Col 1: Brand & Contact */}
						<Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                <Box
								sx={{
									width: 242,
									height: 32,
									display: "flex",
								}}
							>
								<Box
									component="img"
									src="src/assets/LogoFooter.svg"
									alt="Logo"
									sx={{}}
								></Box>
							</Box>

							<Typography
								sx={{
									color: "#ffffff",
									fontSize: "0.85rem",
									fontWeight: 500,
									maxWidth: 360,
									lineHeight: 1.5,
								}}
							>
								Nền tảng công nghệ tiên phong & dẫn đầu lĩnh vực
								kinh doanh bất động sản tại Việt Nam
							</Typography>
              </Box>
              

							{/* Contact list */}
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
                  gap: 1.2,
                  mb: 3,
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1.2,
									}}
								>
									<PhoneIphoneIcon
										sx={{ fontSize: 16, color: "#ffffff" }}
									/>
									<Typography
										sx={{
											fontSize: "0.82rem",
											color: "#ffffff",
											fontWeight: 500,
										}}
									>
										0972 72 9090
									</Typography>
								</Box>

								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1.2,
									}}
								>
									<EmailOutlinedIcon
										sx={{ fontSize: 16, color: "#ffffff" }}
									/>
									<Typography
										sx={{
											fontSize: "0.82rem",
											color: "#ffffff",
											fontWeight: 500,
										}}
									>
										Contact@gmail.com
									</Typography>
								</Box>

								<Box
									sx={{
										display: "flex",
										alignItems: "flex-start",
										gap: 1.2,
									}}
								>
									<PlaceOutlinedIcon
										sx={{
											fontSize: 18,
											color: "#ffffff",
											mt: "2px",
										}}
									/>
									<Typography
										sx={{
											fontSize: "0.82rem",
											color: "#ffffff",
											lineHeight: 1.45,
											maxWidth: 360,
										}}
									>
										S024-06, Sao Biển 24, KĐT Vinhomes Ocean
										Park, Xã Gia Lâm, TP Hà Nội, Việt Nam
									</Typography>
								</Box>
							</Box>
						</Grid>

						{/* Col 2: Danh mục & Kết nối */}
						<Grid size={{ xs: 12, sm: 6, md: 3 }}>
							{/* Danh mục */}
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 700,
									fontSize: "0.98rem",
									color: "#ffffff",
									mb: 1.5,
								}}
							>
								Danh mục
							</Typography>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: 0.8,
									mb: 3,
								}}
							>
								{["Giới thiệu", "Dự án", "Liên hệ"].map(
									(item) => (
										<Link
											key={item}
											href="#"
											underline="hover"
											sx={{
												color: "#ffffff",
												fontSize: "0.82rem",
												display: "flex",
												alignItems: "center",
												gap: 0.8,
												opacity: 0.95,
												"&:hover": { opacity: 1 },
											}}
										>
											<span>•</span> {item}
										</Link>
									),
								)}
							</Box>

							{/* Kết nối */}
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 700,
									fontSize: "0.98rem",
									color: "#ffffff",
									mb: 1.5,
								}}
							>
								Kết nối
							</Typography>

							<Box sx={{ display: "flex", gap: 1 }}>
								{socialIcons.map((s, idx) => (
									<IconButton
										key={idx}
										href={s.href}
										size="small"
										sx={{
											width: 32,
											height: 32,
											borderRadius: "50%",
											border: "1.5px solid rgba(255, 255, 255, 0.7)",
											color: "#ffffff",
											p: 0,
											transition: "all 0.2s",
											"&:hover": {
												bgcolor:
													"rgba(255, 255, 255, 0.2)",
												borderColor: "#ffffff",
											},
										}}
									>
										{s.icon}
									</IconButton>
								))}
							</Box>
						</Grid>

						{/* Col 3: Map Preview Card */}
						<Grid size={{ xs: 12, sm: 6, md: 4 }}>
							<Box
								sx={{
									width: "100%",
									maxWidth: 340,
									ml: { md: "auto" },
									bgcolor: "#ffffff",
									borderRadius: "10px",
									overflow: "hidden",
									boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
									border: "1px solid rgba(255, 255, 255, 0.3)",
								}}
							>
								<Box
									component="img"
									src="src/assets/map.png"
									alt="Vinhomes Ocean Park Map"
									sx={{
										width: "100%",
										height: "234px",
										objectFit: "cover",
										display: "block",
									}}
								/>
							</Box>
						</Grid>
          </Grid>
          <Box>
          <Box
				sx={{
					color: "rgba(255, 255, 255, 0.85)",
					py: 1.8,
                textAlign: "left",
          borderTop: "1px solid #EEF0FD",
				}}
			>
				<Typography sx={{ fontSize: "0.8rem", fontWeight: 500 }}>
					© 2026 - Realestate. All rights reserved.
				</Typography>
			</Box>
      </Box>
				</Container>
        
      </Box>

			{/* Bottom Copyright Bar */}
			
		</Box>
	);
}
