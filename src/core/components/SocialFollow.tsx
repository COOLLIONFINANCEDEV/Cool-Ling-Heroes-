import {  Box, IconButton } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function SocialFollow() {
    return (
<Box
>
<IconButton aria-label="facebook">
  <FacebookOutlinedIcon />
</IconButton>
<IconButton aria-label="tweeter" sx={{ color:"blue"}} href='https://twitter.com/CoolingHeroes'>
  <TwitterIcon />
</IconButton>
<IconButton aria-label="insta">
  <InstagramIcon />
</IconButton>
<IconButton aria-label="LinkedIn">
  <LinkedInIcon />
</IconButton>
<IconButton aria-label="youtube">
  <YouTubeIcon />
</IconButton>
</Box>
)
}

export default SocialFollow;