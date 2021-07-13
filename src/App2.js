import React, {useState, useRef, useEffect} from 'react'
import {Box, Popper, MenuList, MenuItem, IconButton, Button, Grid, Container, Paper, TextField, Hidden, ImageList, ImageListItem, ClickAwayListener, ButtonBase, Link} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {AiOutlineMenu, AiFillGithub, AiOutlineDown} from 'react-icons/ai'
import {MdTranslate, MdNotifications} from 'react-icons/md'
import {VscColorMode} from 'react-icons/vsc'
import {GiMoon} from 'react-icons/gi'
const useStyle = makeStyles({
    test: {
        border: '1px solid red'
    },
    bgTest: {
        backgroundColor: 'darkblue'
    },
    roto: {
        flexGrow: 1
    },
    navBar: {
        backgroundColor: '#1976d2',
        position: 'sticky',
        top: 0,
        zIndex: 1,
    },
    textField: {
        height: '24px'
    },
})
const StyledButtonBase = withStyles({
    root: {
        backgroundColor: '',
    }
})(ButtonBase)
const options = [
    {name: 'option 1'},
    {name: 'option 222222222'},
    {name: 'option 3'},
    {name: 'option 4'},
    {name: 'option 1'},
    {name: 'option 2'},
    {name: 'option 3'},
    {name: 'option 4'},
    {name: 'option 1'},
    {name: 'option 2'},
    {name: 'option 3'},
    {name: 'option 4'},
]
const languages = [
    'English', 'Vietnamese', 'Chinese', 'Italian', 'French'
]
export default function App2() {
    const [primary, setPrimary] = useState(0)
    const classes = useStyle()
    const [open, setOpen] = useState(true)
    return (
        <Grid container>
            <Grid item style={{display: open ? '' : 'none', position: 'fixed', top: 0, height: '100vh', width: '200px', backgroundColor: 'white', zIndex: 2}}>
                <Paper style={{padding: '10px 20px'}}>
                    <Link color='primary' style={{fontSize: '1.25rem', cursor: 'pointer'}}>Material-UI</Link>
                    <br/>
                    <Link color='initial' style={{fontSize: '0.75rem', cursor: 'pointer'}}>v4.12.1</Link>
                </Paper>
                <StyledButtonBase className='btn' style={{padding: '10px 15px', width: '100%', justifyContent: 'start',}}>Getting Started</StyledButtonBase>
                <StyledButtonBase className='btn' style={{padding: '10px 15px', width: '100%', justifyContent: 'start',}}>Getting Started</StyledButtonBase>
            </Grid>
            <Grid item style={{width: open ? '200px': 0}}/>
            <Grid item lg={open ? 10 : 12} md={12}>
                <NavBar menuClick={() => setOpen(prev => !prev)}/>
                <Grid justifyContent='center' container spacing={1} style={{marginTop: '20px'}}>
                    {options.map( (option, index) =>
                        <Grid item>
                            <Button startIcon={primary === index && <GiMoon/>} onClick={() => setPrimary(index)} variant='contained' color={primary === index ? 'primary': 'secondary'}>
                                {option.name}
                            </Button>
                        </Grid>
                    )}
                </Grid>
                <Grid container>
                    <Grid item spacing={0}>
                        <ComplexGrid/><ComplexGrid/>
                    </Grid>
                    
                </Grid>
                <ImageList rowHeight={80} cols={5}>
                    {options.map(({index}) => 
                        <ImageListItem key={index} cols={1}>
                            <img src='https://material-ui.com/static/images/grid/complex.jpg'/>
                        </ImageListItem>
                    )
                    }
                </ImageList>
                <ImageList rowHeight={80} cols={5}>
                    {options.map(({index}) => 
                        <ImageListItem key={index} cols={1}>
                            <img src='https://material-ui.com/static/images/grid/complex.jpg'/>
                        </ImageListItem>
                    )
                    }
                </ImageList>
            </Grid>
        </Grid>
    )
}
function NavBar (props) {
    const languageRef = useRef(null)
    const classes = useStyle()
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setOpen] = useState(false)
    const checkClick = (e) => {
        if (languageRef && !languageRef.current.contains(e.target)) {
            console.log('Click outside dropdown')

        }
    }
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
        setOpen(prev => !prev)
    }
    return (
        <Box className={classes.navBar}>
            <Grid container justifyContent='space-between' style={{padding: ''}}>
                <Grid item >
                    <IconButton onClick={props.menuClick}>
                        <AiOutlineMenu size='24'/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Grid container>
                        {/* dont know how to set height of input */}
                        <Hidden xsDown>
                            <TextField label='Search' variant='filled' size='small'/>
                        </Hidden>
                        <Grid item>
                            <Button onClick={handleClick} ref={languageRef} endIcon={<AiOutlineDown/>}>
                                <MdTranslate size='24'/>
                            </Button>
                            {/* test dropdown */}
                            <Popper anchorEl={anchorEl} open={open} style={{zIndex: 10}}>
                                <ClickAwayListener onClickAway={() => setOpen(false)}>
                                    <Paper>
                                        <MenuList >
                                            {
                                                languages.sort().map(language =>
                                                    <MenuItem>{language}</MenuItem>
                                                )
                                            }
                                        </MenuList>
                                    </Paper>
                                </ClickAwayListener>
                            </Popper>
                            <IconButton disabled>
                                <MdNotifications size='24'/>
                            </IconButton>
                            <IconButton>
                                <VscColorMode size='24'/>
                            </IconButton>
                            <IconButton>
                                <AiFillGithub size='24'/>
                            </IconButton>
                            <IconButton>
                                <GiMoon size='24'/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
function ComplexGrid () {
    return (
        <Paper style={{margin: '10px 5px'}}>
            <ButtonBase style={{padding: '10px', borderRadius: '4px'}}>
                <Grid container spacing={3}>
                    <Grid item>
                        <img src='https://material-ui.com/static/images/grid/complex.jpg'/>
                    </Grid>
                    <Grid item>
                        <Box>
                            Standard lincense
                        </Box>
                        <Box>
                            Full resolution 1920x1080 JPEG
                        </Box>
                        <Box>
                            Standard lincense
                        </Box>
                    </Grid>
                    <Grid item>
                        199.99$
                    </Grid>
                </Grid>
            </ButtonBase>
        </Paper>
    )
}