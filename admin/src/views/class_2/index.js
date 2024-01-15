// material-ui
/* eslint-disable */

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Stack, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Modal from 'react-modal';

// project imports
import axios from 'axios';
import Swal from 'sweetalert2';

import { classService, getUser } from 'service';

const STATUS_CLASS = [
    {
        name: "Active",
        value: true
    },
    {
        name: "Inactive",
        value: false
    }
]

const Class = () => {
    const [classes, setClasses] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Mã lớp', width: 350 },
        { field: 'name', headerName: 'Tên lớp', width: 200 },
        { field: 'title', headerName: 'Tiêu đề', width: 200 },
        { field: 'subject', headerName: 'Môn học', width: 200 },
        { field: 'description', headerName: 'Mô tả', width: 200 },
        { field: 'isActive', headerName: 'Đang hoạt động', width: 200 },
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
                        inputOptions: STATUS_CLASS.reduce((acc, cur) => {
                            return { ...acc, [cur.value]: cur.name };
                        }, {}),
                        inputPlaceholder: 'Chọn một trạng thái',
                        showCancelButton: true
                    });
                    if (status) {
                        const rs = await classService.banOrUnbanAClass({ classId: currentRow.id, ban: status === "true" ? true : false });
                        if (rs.status === 200) {
                            await Swal.fire('Đã cập nhật trạng thái!', '', 'success');
                            return window.location.reload(false);
                        } else {
                            return await Swal.fire('Cập nhật thất bại', '', 'error');
                        }
                    }
                };

                // const handleDelete = (e) => {
                //     e.stopPropagation();
                //     const currentRow = params.row;
                //     Swal.fire({
                //         title: 'Bạn có chắc?',
                //         text: "Bạn không thể hoàn tác sau khi xóa!",
                //         icon: 'warning',
                //         showCancelButton: true,
                //         confirmButtonColor: '#3085d6',
                //         cancelButtonColor: '#d33',
                //         confirmButtonText: 'Có, hãy xóa nó!',
                //         cancelButtonText: "Hủy bỏ",
                //     }).then(async (result) => {
                //         if (result.isConfirmed) {
                //             const rs = await axiosJWT.delete(`${BACKEND_SERVER}/class/${currentRow._id}`);
                //             if (rs.status === 200) {
                //                 await Swal.fire('Đã xóa!', '', 'success');
                //                 return window.location.reload(false);
                //             } else
                //                 return await Swal.fire('Xóa thất bại', '', 'error');
                //         }
                //     });
                // };

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" size="small" onClick={handleSelect}>
                            Đổi trạng thái
                        </Button>
                        {/* <Button variant="contained" color="error" size="small" onClick={handleDelete}>
                            Xóa
                        </Button> */}
                    </Stack>
                );
            }
        }
    ];

    const getAllClass = async () => {
        const rs = await classService.getAll();
        const data = rs.data.data;
        setClasses(data.map((e, i) => ({ ...e })));
    };

    useEffect(() => {
        const user = getUser();
        if (user) {
            getAllClass();
        }
    }, []);
    return (
        <>
            <div style={{ height: 600, width: '100%', marginTop: 20 }}>
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    rows={classes}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 }
                        }
                    }}
                    // rowHeight={160}
                    pageSizeOptions={[10, 20]}
                    // onRowClick={() => { }}
                    onCellClick={async (params, event) => {
                        event.stopPropagation();
                        // await Swal.fire({
                        //     title: `${params.colDef.headerName}`,
                        //     html: `${typeof params.value === "object" ? params.value.map(e => `<ul key=${e._id}><li>Tên: ${e.fullName}</li><li>MSSV: ${e.mssv}</li><li>Giới tính: ${e.gender}</li><li>SDT: ${e.phone}</li><li>Email: ${e.email}</li></ul>`) : params.value}`,
                        //     icon: "info",
                        //     confirmButtonColor: "#3085d6",
                        //     confirmButtonText: "Xác nhận",
                        // }).then(async (result) => {
                        //     if (result.isConfirmed) {

                        //     }
                        // });
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

export default Class;
