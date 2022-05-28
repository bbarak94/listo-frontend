import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export function SelectLabels({ categories }) {
    const [category, setCategory] = React.useState('')
    // console.log('categories:', categories)

    const handleChange = (event) => {
        console.log(event.target.value)
        // setAge(event.target.value)
    }

    return (
        <div>
            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl> */}
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <Select
                    value={category}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    style={{maxHeight:36, color:'#5e6c84', fontSize: '14px', fontStyle: 'normal'}}
                >
                    <MenuItem value=''>
                        <em>choose a category</em>
                    </MenuItem>
                    {categories.map((category, idx) => {
                        return (
                            <MenuItem key={idx} value={category}>
                                <em>{category}</em>
                            </MenuItem>
                        )
                    })}
                </Select>
                {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
        </div>
    )
}

{
    /* <MenuItem value="">
<em>choose a category</em>
</MenuItem>
<MenuItem value={10}>Ten</MenuItem>
<MenuItem value={20}>Twenty</MenuItem>
<MenuItem value={30}>Thirty</MenuItem> */
}
