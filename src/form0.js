import React, {useState} from 'react'
import { Box, Paper, TextField, MenuItem, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@material-ui/core'

const form1 = [
    {
        label: 'Tên hàng hóa, dịch vụ',
        option: [
            'Jet A-1', 'Avgas', 'Diesel 0.05S'
        ]
    },
    {
        label: 'Số lượng',
        option: [
            'USG', 'Lit'
        ]
    },
    {
        label: 'Nhiệt độ (℃)',
    },
    {
        label: 'Dtt (Kg/cm3)',
    },
    {
        label: 'D15',
    },
    {
        label: 'VCF',
    },
    {
        label: 'WCF',
    },
    {
        label: 'số lượng (Lit 15℃)',
    },
    {
        label: 'Tên hàng hóa, dịch vụ',
        option: [
            'Jet A-1', 'Avgas', 'Diesel 0.05S'
        ]
    },
    {
        label: 'Số lượng (kg)',
    },
]
const form = [
    {
        label: 'Mẫu số',
        option: [
            'AE/20E - 03XKNB0/001',
            'AE/20E - 03XKNB0/002',
            'AE/20E - 03XKNB0/003',
            'AE/20E - 03XKNB0/004'
        ],
    },
    {
        label: 'Lệnh điều động số',
        option: []
    },
    {
        label: 'của',
        option: [
            'Công ty CP Nhiên liệu bay',
        ]
    },
    {
        label: 'Họ tên người vận chuyển',
        option: [
            'Lê Viết Đẳng', 'Trần Văn Thái', 'Tăng Minh Hậu'
        ]
    },
    {
        label: 'Phương tiện vận chuyển',
        option: [
            '00', 'SGN3', 'DAD3', 'CXR3'
        ]
    },
    {
        label: 'Số lượng niêm chì/số niêm',
    },
    {
        label: 'Xuất tại kho',
        option: [
            'CN Cát Bi', 'Thượng Lý', 'Tổng kho Nhà Bè'
        ]
    },
    {
        label: 'Chứng chỉ xuất kho số/ngày',
    },
    {
        label: 'Nhập tại kho',
        option: [
            'Kho 1', 'Kho 2', 'Kho 4'
        ]
    },
    {
        label: 'Đơn vị nhập'
    }
];

export default function Receipt () {
    const [fieldData, setFieldData] = useState(() => {
        let object = {}
        for (let i = 0; i < form.length; i++){
            if (form[i].option) object[form[i].label] = form[i].option[0] || ''
        }
        return object
    })      // khoi tao initial fieldData theo config co san
    const initialHanghoa = {
        hanghoa: 'Jet A-1',
        type: 'USG'
    }
    const [hanghoaData, setHangHoaData] = useState([])
    const handleChangeFieldData = (e, field) => {
        let newObject = fieldData
        newObject =  {...newObject,[field.label]: e.target.value}
        setFieldData(newObject)
    }       // cap nhat fieldData khi textfield thay doi
    const handleChangeHangHoaData = (value, key, stt) => {     //3 tham so value: gia tri, ten key, stt mang
        
        setHangHoaData(prev => {
            let newArray = prev.filter((element, index) => {
                if (index === stt) {element[key] = value; console.log(`${index} and ${stt}`)}
                return element
            })
            return newArray
        })
    }
    const addNewHangHoa = () => {
        setHangHoaData(prev => [...prev, initialHanghoa])
    }
    const removeHangHoa = (index) => {
        setHangHoaData(prev => prev.length > 0 && prev.filter((ele, indexx) => index !== indexx))
    }
    return (
        <Paper>
            <Box
            style={{backgroundColor: '#a4b7c1', display: 'flex', justifyContent: 'center'}}
            >
                PHIẾU XUẤT KHO KIÊM VẬN CHUYỂN NỘI BỘ
            </Box>
            <Grid container
            style={{
                padding: '20px'
            }}
            spacing={3}
            >
                {
                    form.map((field, index) => 
                        <Grid item key={index}
                        style={{
                            minWidth: '50%',
                        }}
                        >
                            <TextField
                            fullWidth
                            value={fieldData[field.label]}
                            label={field.label}
                            select={field.option && field.option.length !== 0}
                            onChange={e => handleChangeFieldData(e, field)}
                            >
                                    {
                                        field.option && field.option.map(option =>
                                            <MenuItem
                                            key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        )
                                    }
                            </TextField>
                        </Grid>
                    )
                }
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell align='center'>STT</TableCell>
                        <TableCell align="center">Tên hàng hóa, dịch vụ</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Nhiệt độ (℃)</TableCell>
                        <TableCell align="center">Dtt (Kg/cm3)</TableCell>
                        <TableCell align="center">D15</TableCell>
                        <TableCell align="center">VCF</TableCell>
                        <TableCell align="center">WCF</TableCell>
                        <TableCell align="center">số lượng (Lit 15℃)</TableCell>
                        <TableCell align="center">Số lượng (kg)</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            hanghoaData.map((item, index) =>
                                <TableRow key={index}>
                                    <TableCell align='center'>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell algin='center'>
                                        <TextField fullWidth select 
                                        value={item.hanghoa}
                                        onChange={e => handleChangeHangHoaData(e.target.value, 'hanghoa', index)}
                                        >
                                            <MenuItem value='Jet A-1'>Jet A-1</MenuItem>
                                            <MenuItem value='Avgas'>Avgas</MenuItem>
                                            <MenuItem value ='Diesel 0.05S'>Diesel 0.05S</MenuItem>
                                        </TextField>
                                    </TableCell>
                                    <TableCell>
                                        <TextField inputProps={{style: {textAlign: 'center'}}} style={{width: 'calc(100% - 70px)'}} value={item.soluong} onChange={e => handleChangeHangHoaData(e.target.value, 'soluong', index)}/>
                                        <TextField style={{minWidth: '50px'}} select value={item.type}
                                        onChange={e => handleChangeHangHoaData(e.target.value, 'type', index)}
                                        >
                                            <MenuItem value='USG'>USG</MenuItem>
                                            <MenuItem value='Lit'>Lit</MenuItem>
                                        </TextField>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TextField inputProps={{style: {textAlign: 'center'}}} value={item.nhietdo} onChange={e => handleChangeHangHoaData(e.target.value, 'nhietdo', index)}/>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <TextField inputProps={{style: {textAlign: 'center'}}} value={item.dtt} onChange={e => handleChangeHangHoaData(e.target.value, 'dtt', index)}/>
                                    </TableCell>
                                    <TableCell align='center'>
                                        {/* e=mc2 */}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {/* e=mc2 */}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {/* e=mc2 */}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {/* e=mc2 */}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {/* e=mc2 */}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Button onClick={() => removeHangHoa(index)}>
                                            x
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                    
                </Table>
            </TableContainer>
            <Button fullWidth onClick={addNewHangHoa}>Thêm hàng hóa</Button>
        </Paper>
    )
}