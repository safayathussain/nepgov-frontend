"use client";

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
  WhatsappIcon,
  XIcon,
} from "react-share";

const ShareButtons = ({
  shareUrl = typeof window !== "undefined" && window.location.href,
}) => {
  console.log(shareUrl)
  return (
    <div className="flex gap-1">
      {/* Facebook */}
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>

      {/* Messenger
      <FacebookMessengerShareButton url={shareUrl} appId="YOUR_FACEBOOK_APP_ID">
        <FacebookMessengerIcon size={30} round />
      </FacebookMessengerShareButton> */}

      {/* WhatsApp */}
      <WhatsappShareButton url={shareUrl} separator=" - ">
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>

      {/* LinkedIn */}
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>
      {/* X (New Twitter) */}
      <TwitterShareButton url={shareUrl}>
        <XIcon size={30} round />
      </TwitterShareButton>
    </div>
  );
};

export default ShareButtons;
