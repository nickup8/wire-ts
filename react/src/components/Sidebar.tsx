import {
    Drawer,
    Toolbar,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
} from "@mui/material";

import { Link, NavLink } from "react-router-dom";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import AppsIcon from "@mui/icons-material/Apps";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import Grid4x4Icon from "@mui/icons-material/Grid4x4";
import GroupIcon from "@mui/icons-material/Group";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

import { useAppSelector } from "../hooks";
import { useState } from "react";

const drawerWidth = 240;

export const Sidebar = () => {
    const [openWarehouse, setOpenWarehouse] = useState(false);
    const [openFeeding, setOpenFeeding] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);
    const [openDocuments, setOpenDocuments] = useState(false);
    const open = useAppSelector((state) => state.drawer.open);
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <Toolbar />
            <List>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Панель" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => setOpenWarehouse(!openWarehouse)}
                >
                    <ListItemIcon>
                        <WarehouseIcon />
                    </ListItemIcon>
                    <ListItemText primary="Склад" />
                    {openWarehouse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={openWarehouse} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/warehouse"
                        >
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Места хранения" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/warehouse/acceptance"
                        >
                            <ListItemIcon>
                                <SystemUpdateAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Зона приемки" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={NavLink}
                            to="/warehouse/marriage"
                        >
                            <ListItemIcon>
                                <CancelIcon />
                            </ListItemIcon>
                            <ListItemText primary="Изолятор брака" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenFeeding(!openFeeding)}>
                    <ListItemIcon>
                        <Grid4x4Icon />
                    </ListItemIcon>
                    <ListItemText primary="Фидинг" />
                    {openFeeding ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={openFeeding} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItemButton
                            component={Link}
                            to="/feeding"
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <AppsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Места хранения" />
                        </ListItemButton>
                        <ListItemButton
                            component={Link}
                            to="/feeding/buffer"
                            sx={{ pl: 4 }}
                        >
                            <ListItemIcon>
                                <SystemUpdateAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Буферная зона" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton
                    onClick={() => setOpenDocuments(!openDocuments)}
                >
                    <ListItemIcon>
                        <AttachFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="Документы" />
                    {openDocuments ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={openDocuments} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/invoices"
                        >
                            <ListItemIcon>
                                <CreateNewFolderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Накладные" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={() => setOpenSetting(!openSetting)}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Настройки" />
                    {openSetting ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemButton>
                <Collapse in={openSetting} timeout="auto" unmountOnExit>
                    <List component="div">
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={NavLink}
                            to="/users"
                        >
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Пользователи" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/suppliers"
                        >
                            <ListItemIcon>
                                <SystemUpdateAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Поставщики" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/storage_bin_warehouse"
                        >
                            <ListItemIcon>
                                <WarehouseIcon />
                            </ListItemIcon>
                            <ListItemText primary="МХ склад" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/storage_bin_feeding"
                        >
                            <ListItemIcon>
                                <Grid4x4Icon />
                            </ListItemIcon>
                            <ListItemText primary="МХ фидинг" />
                        </ListItemButton>
                        <ListItemButton
                            sx={{ pl: 4 }}
                            component={Link}
                            to="/machines"
                        >
                            <ListItemIcon>
                                <SystemUpdateAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="Оборудование" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
};
