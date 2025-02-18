import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { format } from "date-fns"

const DateTimePickerComponent = ({ label, id, name, className, placeholder, value, onChange, ...etc }) => {
  const handleDateChange = (newValue) => {
    const formattedDate = format(newValue, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    onChange(formattedDate)
  }

  if (!id) {
    id = `datetime-picker-${Math.random().toString(36).substr(2, 9)}`
  }

  const defaultValue = value ? new Date(value) : null

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={className}>
        <label htmlFor={id} className="block text-black text-[15px]">
          {label}
        </label>
        <div className="mt-0.5">
          <DateTimePicker
            id={id}
            
            className="w-full"
            value={defaultValue}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                placeholder: placeholder,
                sx: {
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "9999px",
                    "& fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#e2e8f0",
                    },
                    "&.Mui-focused": {
                      outline: "none",
                      "& fieldset": {
                        border: "none",
                        outline: "none",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #e2e8f0",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #e2e8f0",
                      boxShadow: "none",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    padding: "10px 14px",
                    "&:focus": {
                      outline: "none",
                      boxShadow: "none",
                    },
                  },
                },
              },
            }}
            {...etc}
          />
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default DateTimePickerComponent

