/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

interface MagicScrollWrapperProps {
  window?: () => Window;
  children: React.ReactNode;
}

function HideOnScroll(props: {
  window?: () => Window;
  children: React.ReactElement<unknown, any>;
}) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const MagicScrollWrapper = (props: MagicScrollWrapperProps) => {
  const { children, window } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll window={window}>
        <AppBar
          sx={{
            p: 0,
            boxShadow: "none",
            backgroundColor: "transparent",
            width: "100%",
            height: 72,
          }}
        >
          <Toolbar style={{ padding: 0, height: 72 }} sx={{ px: 0, margin: 0 }}>
            {children}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Adds spacing below the AppBar */}
    </React.Fragment>
  );
};

export default MagicScrollWrapper;
export { HideOnScroll };
