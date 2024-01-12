// material-ui
/* eslint-disable */

import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Modal from 'react-modal';

// project imports
import axios from 'axios';
import Swal from 'sweetalert2';

// import { SERVER_API } from '../../host/index';

import { SET_MENU } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';

const BACKEND_SERVER = process.env.REACT_APP_BACKEND_SERVER;

const STATUS_CLASS = [
    {
        name: "Chờ Duyệt",
        value: 0,
    },
    {
        name: "Duyệt",
        value: 1,
    },
    {
        name: "Lớp Cũ",
        value: 99,
    }
]

const DuyetLop = () => {
    const [classes, setClasses] = useState([]);

    let user = JSON.parse(sessionStorage.getItem('gs'));

    let axiosJWT = createAxios(user);

    const dispatch = useDispatch();
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: leftDrawerOpened ? !leftDrawerOpened : leftDrawerOpened });
    };
    const handleRightDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: leftDrawerOpened ? leftDrawerOpened : !leftDrawerOpened });
    };

    const columns = [
        { field: 'fullName', headerName: 'Họ và tên phụ huynh', width: 200 },
        { field: 'phone', headerName: 'Sdt', width: 150 },
        { field: 'information', headerName: 'Thông tin học sinh', width: 200 },
        { field: 'subject', headerName: 'Môn học', width: 150 },
        { field: 'time', headerName: 'Thời gian', width: 200 },
        { field: 'method', headerName: 'Hình thức', width: 150 },
        { field: 'address', headerName: 'Địa chỉ', width: 200 },
        { field: 'require', headerName: 'Yêu cầu', width: 200 },
        { field: 'createdAt', headerName: 'Gửi lúc', width: 150 },
        { field: 'status', headerName: 'Trạng thái', width: 150 },
        {
            field: 'action',
            headerName: 'Actions',
            width: 250,
            disableClickEventBubbling: true,

            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const handleSelect = async (e) => {
                    e.stopPropagation();
                    const currentRow = params.row;
                    console.log(currentRow._id);
                    const { value: status } = await Swal.fire({
                        title: 'Chọn trạng thái',
                        input: 'select',
                        inputOptions: STATUS_CLASS.reduce((acc, cur) => {
                            return { ...acc, [cur.value]: cur.name };
                        }, {}),
                        inputPlaceholder: 'Chọn một trạng thái',
                        showCancelButton: true
                    });
                    if (status) {
                        const rs = await axiosJWT.patch(`${BACKEND_SERVER}/class`, {
                            status,
                            _id: currentRow._id,
                        })
                        if (rs.status === 200) {
                            await Swal.fire('Đã cập nhật trạng thái!', '', 'success');
                            return window.location.reload(false);
                        } else {
                            return await Swal.fire('Cập nhật thất bại', '', 'error');
                        }
                    }
                };

                const handleDelete = (e) => {
                    e.stopPropagation();
                    const currentRow = params.row;
                    Swal.fire({
                        title: 'Bạn có chắc?',
                        text: "Bạn không thể hoàn tác sau khi xóa!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Có, hãy xóa nó!',
                        cancelButtonText: "Hủy bỏ",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const rs = await axiosJWT.delete(`${BACKEND_SERVER}/class/${currentRow._id}`);
                            if (rs.status === 200) {
                                await Swal.fire('Đã xóa!', '', 'success');
                                return window.location.reload(false);
                            } else
                                return await Swal.fire('Xóa thất bại', '', 'error');
                        }
                    });
                };

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" size="small" onClick={handleSelect}>
                            Đổi trạng thái
                        </Button>
                        <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                            Xóa
                        </Button>
                    </Stack>
                );
            }
        }
    ];

    const getAllClass = async () => {
        const rs = await axiosJWT.get(`${BACKEND_SERVER}/class/get-all`);
        const data = rs.data;
        console.log(data);
        setClasses(data.classes.map((e, i) => ({ ...e, id: i + 1, status: e.status ? 'Duyệt' : 'Chờ duyệt' })));
    };

    useEffect(() => {
        user = JSON.parse(sessionStorage.getItem('gs'));
        if (user) {
            getAllClass();
        }
    }, []);
    return (
        <>
            <div style={{ height: 600, width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={classes}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 }
                        }
                    }}
                    pageSizeOptions={[10, 20]}
                    onRowClick={(e) => openModal(e)}
                    onCellClick={async (params, event) => {
                        event.stopPropagation();
                        console.log(params);
                        await Swal.fire({
                            title: `${params.colDef.headerName}`,
                            text: `${params.value}`,
                            icon: "info",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Xác nhận",
                        }).then(async (result) => {
                            if (result.isConfirmed) {

                            }
                        });
                    }}
                    sx={{
                        // disable cell selection style
                        '.MuiDataGrid-cell:focus': {
                            outline: 'none'
                        },
                        // pointer cursor on ALL rows
                        '& .MuiDataGrid-row:hover': {
                            cursor: 'pointer'
                        }
                    }}
                />
            </div>
        </>
    );
};

export default DuyetLop;
