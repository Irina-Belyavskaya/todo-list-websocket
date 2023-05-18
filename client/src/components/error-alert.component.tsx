import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { useState } from "react";

// ============== Types ==============
import { ErrorAlertProps } from "types/error-alert-props.type";

// ============== Icons ==============
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorAlert({title, text} : ErrorAlertProps) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {title}: {text}
        </Alert>
      </Collapse>
    </Box>
  )
}