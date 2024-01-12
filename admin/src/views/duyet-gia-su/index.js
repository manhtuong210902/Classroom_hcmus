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

const STATUS_TUTOR = [
    {
        name: "Chờ Duyệt",
        value: 0,
    },
    {
        name: "Duyệt",
        value: 1,
    }
]

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const DuyetGiaSu = () => {
    const [tutors, setTutors] = useState([]);

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
        { field: 'classId', headerName: 'Mã lớp', width: 70 },
        { field: 'fullName', headerName: 'Họ và tên', width: 150 },
        { field: 'gender', headerName: 'Giới tính', width: 100 },
        { field: 'mssv', headerName: 'Mã số sinh viên', width: 150 },
        { field: 'faculty', headerName: 'Khoa', width: 150 },
        { field: 'phone', headerName: 'Sdt', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'fb', headerName: 'Facebook', width: 150 },
        { field: 'card', headerName: 'Thẻ SV', width: 150 },
        { field: 'test', headerName: 'Bài test', width: 150 },
        { field: 'cv', headerName: 'CV', width: 150 },
        { field: 'exp', headerName: 'Kinh nghiệm', width: 150 },
        { field: 'strong', headerName: 'Điểm mạnh', width: 150 },
        { field: 'question', headerName: 'Câu hỏi', width: 150 },
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
                    const { value: status } = await Swal.fire({
                        title: 'Chọn trạng thái',
                        input: 'select',
                        inputOptions: STATUS_TUTOR.reduce((acc, cur) => {
                            return { ...acc, [cur.value]: cur.name };
                        }, {}),
                        inputPlaceholder: 'Chọn một trạng thái',
                        showCancelButton: true
                    });
                    console.log(status);
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
                            const rs = await axiosJWT.delete(`${BACKEND_SERVER}/tutor/${currentRow._id}`);
                            if (rs.status === 200) {
                                await Swal.fire('Đã xóa!', '', 'success');
                                return window.location.reload(false);
                            } else
                                return await Swal.fire('Xóa thất bại', '', 'error');
                        }
                    });
                };

                const handleApprove = async (e) => {
                    e.stopPropagation();
                    const currentRow = params.row;
                    Swal.fire({
                        title: 'Bạn có muốn duyệt gia sư này?',
                        text: "Nhấn xác nhận để duyệt!",
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: "Hủy bỏ",
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const rs = await axiosJWT.patch(`${BACKEND_SERVER}/tutor/approve`, {
                                _id: currentRow._id,
                                status: 1
                            });
                            if (rs.status === 200) {
                                await Swal.fire('Duyệt thành công!', '', 'success');
                                return window.location.reload(false);
                            } else
                                return await Swal.fire('Duyệt thất bại', '', 'error');
                        }
                    });
                }

                return (
                    <Stack direction="row" spacing={2}>
                        {/* <Button variant="contained" color="primary" size="small" onClick={handleSelect}>
                            Đổi trạng thái
                        </Button> */}
                        <Button variant="contained" color="primary" size="small" onClick={handleApprove}>
                            Duyệt gia sư
                        </Button>
                        <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                            Xóa
                        </Button>
                    </Stack>
                );
            }
        }
    ];

    const getAllTutor = async () => {
        const rs = await axiosJWT.get(`${BACKEND_SERVER}/tutor/get-all`);
        const data = rs.data;
        setTutors(data.tutors.map((e, i) => ({ ...e, id: i + 1, status: status ? 'Duyệt' : 'Chờ duyệt' })));
    };

    useEffect(() => {
        user = JSON.parse(sessionStorage.getItem('gs'));
        if (user) {
            getAllTutor();
        }
    }, []);
    return (
        <>
            <div style={{ height: 600, width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={tutors}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 }
                        },
                        filter: {
                            filterModel: {
                                items: [],
                                quickFilterExcludeHiddenColumns: true
                            }
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

export default DuyetGiaSu;
