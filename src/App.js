import React, { useState } from "react";
import "./App.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CustomizedSnackbars from "./CustomizedSnackbars";

const mockData = [
  {
    id: 1,
    task: "Give dog a bath",
    status: "true",
  },
  {
    id: 2,
    task: "Do laundry",
    status: "true",
  },
  {
    id: 3,
    task: "Vacuum floor",
    status: "false",
  },
  {
    id: 4,
    task: "Feed cat",
    status: "true",
  },
  {
    id: 5,
    task: "Change light bulbs",
    status: "false",
  },
  {
    id: 6,
    task: "Go to Store",
    status: "true",
  },
  {
    id: 7,
    task: "Fill gas tank",
    status: "true",
  },
  {
    id: 8,
    task: "Change linens",
    status: "false",
  },
  {
    id: 9,
    task: "Rake leaves",
    status: "true",
  },
  {
    id: 10,
    task: "Bake Cookies",
    status: "false",
  },
  {
    id: 11,
    task: "Take nap",
    status: "true",
  },
  {
    id: 12,
    task: "Read book",
    status: "true",
  },
  {
    id: 13,
    task: "Exercise",
    status: "false",
  },
  {
    id: 14,
    task: "Give dog a bath",
    status: "false",
  },
  {
    id: 15,
    task: "Do laundry",
    status: "false",
  },
  {
    id: 16,
    task: "Vacuum floor",
    status: "false",
  },
  {
    id: 17,
    task: "Feed cat",
    status: "true",
  },
  {
    id: 18,
    task: "Change light bulbs",
    status: "false",
  },
  {
    id: 19,
    task: "Go to Store",
    status: "false",
  },
  {
    id: 20,
    task: "Fill gas tank",
    status: "false",
  },
];

function App() {
  if (
    !JSON.parse(localStorage.getItem("lists")) ||
    JSON.parse(localStorage.getItem("lists")).length === 0
  ) {
    localStorage.setItem("lists", JSON.stringify(mockData));
  }
  const [list, setList] = useState(JSON.parse(localStorage.getItem("lists")));
  const [textfield, setTextField] = useState(undefined);
  const [button, setButton] = useState("");
  const [open, setOpen] = useState(false);

  const handleBar = () => {
    setOpen(true);
  };

  const handleTextField = (e) => {
    setTextField(e.target.value);
  };
  const handleChange = (id, status) => {
    const _data = JSON.parse(localStorage.getItem("lists"));
    if (status) {
      const val = _data.find((obj) => obj.id === id);
      if (val.status === "true") {
        val.status = "false";
      } else if (val.status === "false") {
        val.status = "true";
      }
    }
    localStorage.setItem("lists", JSON.stringify(_data));
    setList(_data);
  };
  const onClickHandler = () => {
    // Default status value is true
    const _data = JSON.parse(localStorage.getItem("lists"));
    const _id = _data.length + 1;
    _data.push({
      id: _id,
      task: textfield,
      status: "true",
    });
    if (textfield) {
      localStorage.setItem("lists", JSON.stringify(_data));
      setList(_data);
      setButton("add");
      handleBar();
    }
  };

  const onRemoveHandler = (id) => {
    const _data = JSON.parse(localStorage.getItem("lists"));
    const newData = _data.filter((val) => val.id !== id);
    localStorage.setItem("lists", JSON.stringify(newData));
    setList(newData);
    setButton("remove");
    handleBar();
  };
  return (
    <div className="App">
      <div className="container">
        <TextField className="text" onChange={handleTextField} />
        <Button className="button" variant="contained" onClick={onClickHandler}>
          Add
        </Button>
      </div>
      {list.map(({ id, task, status }) => {
        return (
          <div key={id} className="card">
            <div className="mini-container">
              <h1 className="task">{task}</h1>
            </div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={() => handleChange(id, status)}
                >
                  <MenuItem value={"true"}>True</MenuItem>
                  <MenuItem value={"false"}>False</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              className="button"
              variant="contained"
              onClick={() => onRemoveHandler(id)}
            >
              Remove
            </Button>
          </div>
        );
      })}
      <CustomizedSnackbars button={button} open={open} setOpen={setOpen} />
    </div>
  );
}

export default App;
