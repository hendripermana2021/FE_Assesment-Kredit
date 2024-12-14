import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Chip,
  Badge
} from '@mui/material';

import { serverSourceDev } from 'constant/constantaEnv';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import $ from 'jquery';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Stack } from '@mui/system';
import DetailGenerated from './detailGenerated';
import { ExpandMore } from '@mui/icons-material';
import { IconEye } from '@tabler/icons-react';
import { toDecimal } from 'constant/functionGlobal';
// import UpdateAjuan from './updateAjuan';

const GeneratedTable = () => {
  const [ajuan, setAjuan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kriteria, setKriteria] = useState([]);
  const [btnCpi, setBtnCpi] = useState(true);
  const [roc, setRoc] = useState([]);
  const [cpi, setCpi] = useState([]);

  useEffect(() => {
    if (!$.fn.DataTable.isDataTable('#tblGenerated')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblGenerated').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblGenerated').DataTable();
          }
        }, 1000);
      });
    }
    if (!$.fn.DataTable.isDataTable('#tblKriteria')) {
      $(document).ready(function () {
        const tableInterval = setInterval(() => {
          if ($('#tblKriteria').is(':visible')) {
            clearInterval(tableInterval);
            $('#tblKriteria').DataTable();
          }
        }, 1000);
      });
    }
    getAjuan();
    getKriteria();
  }, []);

  const getAjuan = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}ajuan`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setAjuan(response.data.data);
      setLoading(false);
      console.log(response.data.data);
      // console.log(sessionStorage.getItem('accessToken'));
    } catch (error) {
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Data Tidak Ada',
          text: 'Maaf Data tidak ditemukan atau belum dibuat'
        });
      }
      console.log(error, 'Error fetching data');
      setLoading(false);
    }
  };

  const getKriteria = async () => {
    try {
      const response = await axios.get(`${serverSourceDev}kriteria-sub`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      setKriteria(response.data.data);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response?.status === 404 ? 'Data Tidak Ada' : 'Error',
        text: 'Maaf Data tidak ditemukan atau terjadi kesalahan'
      });
      setLoading(false);
    }
  };

  const countROC = async () => {
    Swal.fire({
      title: 'Generated ROC?',
      text: 'Lakukan perhitungan ROC pada tiap Kriteria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Generated'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(`${serverSourceDev}action/calculatedROC`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          setRoc(response.data.data);
          getKriteria(); // Reload the data after deletion
          setBtnCpi(false);
          console.log('data roc generated : ', response.data.data);
          Swal.fire('Success!', 'Generated has been successfully.', 'success');
        } catch (error) {
          console.log('TOken for generated ROC :', sessionStorage.getItem('accessToken'));
          Swal.fire('Error!', 'Generated ROC Failed.', 'error');
        }
      }
    });
  };

  const countCPI = async () => {
    Swal.fire({
      title: 'Generated CPI?',
      text: 'Lakukan perhitungan CPI pada tiap Kriteria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Generated'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.get(`${serverSourceDev}action/calculatedCPI`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          });
          setCpi(response.data.data);
          getAjuan(); // Reload the data after deletion
          console.log('data CPI generated : ', response.data.data);
          Swal.fire('Success!', 'Generated has been successfully.', 'success');
        } catch (error) {
          console.log('TOken for generated CPI :', sessionStorage.getItem('accessToken'));
          Swal.fire('Error!', 'Generated CPI Failed.', 'error');
        }
      }
    });
  };

  console.log('Request ROC ini bung!', roc.resultArray?.length);
  console.log('Request CPI ini bung!', cpi.step1?.groupedArrays[0][3]);

  return (
    <>
      <Card>
        <CardHeader
          title="Data Ajuan"
          subheader="Ini adalah page table untuk melihat data nasabah, yang ingin melakukan pengajuan kredit, dan telah ditambahkan oleh petugas"
        />
        <CardContent>
          <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
            <Grid container spacing={2}>
              {' '}
              <Grid item xs={8} md={8} sm={4}></Grid>
              <Grid item xs={4} md={4} sm={2} sx={{ textAlign: 'end' }}>
                <Button variant="contained" color="secondary" onClick={() => countROC()} sx={{ marginRight: '1em' }}>
                  Generated ROC
                </Button>
                <Button variant="contained" color="secondary" onClick={() => countCPI(true)} disabled={btnCpi}>
                  Generated CPI
                </Button>
              </Grid>
            </Grid>
            <CardContent>
              <table className="table table-hover " id="tblGenerated">
                <thead>
                  <tr>
                    <th className="text-center">No.</th>
                    <th className="text-center">Name Nasabah</th>
                    <th className="text-center">Gender</th>
                    <th className="text-center">NIK</th>
                    <th className="text-center">Pengaju</th>
                    <th className="text-center">Date Add</th>
                    <th className="text-center">CPI Result</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Rank</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9">Loading...</td>
                    </tr>
                  ) : ajuan.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No Ajuan available
                      </td>
                    </tr>
                  ) : (
                    ajuan.map((value, index) => (
                      <tr key={index}>
                        {/* <td className="text-center">{index + 1}</td> */}
                        <td>{index + 1}</td> {/* Assuming name is 'name' */}
                        <td>{value.nasabah?.name_nasabah || ''}</td> {/* Assuming name is 'name' */}
                        <td className="text-center">{value.nasabah?.gender || ''}</td> {/* Assuming gender is 'gender' */}
                        <td>{value.nasabah?.nik || ''}</td> {/* Assuming address is 'address' */}
                        <td>{value.petugas_pengaju == null || '' ? '' : value.petugas_pengaju.name_user}</td>{' '}
                        {/* Assuming Pengaju is 'pengaju' */}
                        <td>{value.createdAt ? new Date(value.createdAt).toLocaleString() : ''}</td>
                        <td>
                          {typeof value.cpi_result === 'number'
                            ? new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }).format(value.cpi_result)
                            : value.cpi_result}
                        </td>
                        <td>{value.status_ajuan}</td>
                        <td>{value.rank || 'No Rank'}</td>
                        <td className="text-center">
                          <Stack direction="row" spacing={1}>
                            {/* Detail Button */}
                            <DetailGenerated generated={value} />
                          </Stack>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '2em' }}>
        <CardHeader
          title="Data Kriteria"
          subheader="Ini adalah page table untuk melihat data kriteria, yang ingin melakukan pengajuan kredit, dan telah ditambahkan oleh petugas"
        />
        <CardContent>
          <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
            <table className="table table-hover " id="tblKriteria">
              <thead>
                <tr>
                  <td align="center">ID</td>
                  <td align="center">Name Kriteria</td>
                  <td align="center">Scale Priority</td>
                  <td align="center">Type</td>
                  <td align="center">Bobot Kriteria</td>
                  <td align="center">Sub-Kriteria</td>
                </tr>
              </thead>
              <tbody>
                {!loading && kriteria.length > 0 ? (
                  kriteria.map((data, index) => (
                    <tr key={data.id}>
                      <td align="center">{data.id}</td>
                      <td align="center">{data.name_kriteria}</td>
                      <td align="center">{data.scale_priority}</td>
                      <td align="center">
                        {data.type === true ? (
                          <Chip label="Profit" color="primary" variant="outlined" />
                        ) : (
                          <Chip label="Cost" color="error" variant="outlined" />
                        )}
                      </td>
                      <td align="center">
                        {' '}
                        {typeof data.weight_score === 'number'
                          ? new Intl.NumberFormat('en-US', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            }).format(data.weight_score)
                          : data.weight_score}
                        {}
                      </td>
                      <td align="center">
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
                            Sub Kriteria - {index + 1}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Table>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="center">ID</TableCell>
                                  <TableCell align="center">Name Sub</TableCell>
                                  <TableCell align="center">Value</TableCell>
                                  <TableCell align="center">Description</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {data.sub_kriteria.length > 0 ? (
                                  data.sub_kriteria.map((sub, index) => (
                                    <TableRow key={sub.id}>
                                      <TableCell align="center">{index + 1}</TableCell>
                                      <TableCell align="center">{sub.name_sub}</TableCell>
                                      <TableCell align="center">{sub.value}</TableCell>
                                      <TableCell align="center">
                                        <Tooltip title={sub.description}>
                                          <IconButton>
                                            <IconEye />
                                          </IconButton>
                                        </Tooltip>
                                      </TableCell>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableCell colSpan={4} align="center">
                                      No Sub-Kriteria available
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </AccordionDetails>
                        </Accordion>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} align="center">
                      {loading ? 'Loading...' : 'No data available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '1em' }}>
        <CardHeader
          title="Generated Section"
          subheader="Ini adalah page table untuk melihat data kriteria, yang ingin melakukan pengajuan kredit, dan telah ditambahkan oleh petugas"
        />
        <CardContent>
          <Card variant="outlined" sx={{ boxShadow: 3, padding: '1em' }}>
            <CardHeader
              title="Path for ROC"
              subheader="Ini adalah section untuk pencarian hasil dengan menggunakan metode ROC (Rank Order Centroid)"
            />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">Name Kriteria</TableCell>
                  <TableCell align="center">Penyelesaian</TableCell>
                  <TableCell align="center">Hasil</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roc.result?.length > 0 ? (
                  roc.result?.map((data, index) => (
                    <React.Fragment key={index}>
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{data.name_kriteria}</TableCell>
                        <TableCell align="center">
                          <Stack spacing={2}>
                            {roc.rocArray?.[index].map((array, indexArray) => (
                              <React.Fragment key={indexArray}>
                                {' '}
                                {typeof roc.rocArray[index][indexArray] === 'number'
                                  ? new Intl.NumberFormat('en-US', {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    }).format(roc.rocArray[index][indexArray])
                                  : roc.rocArray[index][indexArray]}{' '}
                                {indexArray < roc.rocArray?.length - 1 ? '+' : ''}
                              </React.Fragment>
                            ))}
                          </Stack>{' '}
                          / {roc.rocArray?.length}
                        </TableCell>
                        <TableCell>
                          {typeof roc.resultArray?.[index] === 'number'
                            ? new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }).format(roc.resultArray?.[index])
                            : roc.resultArray?.[index]}
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} align="center">
                      {loading ? 'Loading...' : 'No data available'}
                    </td>
                  </tr>
                )}
              </TableBody>
              {/* <p>{data.name_kriteria}</p> */}
            </Table>
          </Card>
        </CardContent>
        <CardContent>
          <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
            <CardHeader
              title="Path for CPI"
              subheader="Ini adalah section untuk pencarian hasil dengan menggunakan metode CPI (Composite Preference Index)"
            />{' '}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
                1. Normalisasi Elemen Matriks Awal
              </AccordionSummary>
              <AccordionDetails>
                <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Nama Nasabah</TableCell>
                        {cpi.kriteria?.map((data, index) => (
                          <TableCell key={index}>
                            {data.type === true ? (
                              <Badge badgeContent={`C${index + 1}`} color="primary" />
                            ) : (
                              <Badge badgeContent={`C${index + 1}`} color="warning" />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cpi.result?.map((data, index) => (
                        <>
                          <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{data.nasabah.name_nasabah}</TableCell>
                            {cpi.step1?.groupedArrays[index].map((arrays, indexArrays) => (
                              <TableCell key={indexArrays}>{arrays}</TableCell>
                            ))}
                          </TableRow>
                        </>
                      ))}
                      <TableRow>
                        <TableCell colSpan={cpi.step1?.minValues.length + 2}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Nilai Min</TableCell>
                        {cpi.step1?.minValues.map((min, indexMin) => (
                          <TableCell key={indexMin}>{min}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>Nilai Max</TableCell>
                        {cpi.step1?.maxValues.map((max, indexMax) => (
                          <TableCell key={indexMax}>{max}</TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
                <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em', marginTop: '2em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Nama Nasabah</TableCell>
                        {cpi.kriteria?.map((data, index) => (
                          <TableCell key={index}>
                            {data.type === true ? (
                              <Badge badgeContent={`C${index + 1}`} color="primary" sx={{ left: '1em' }} />
                            ) : (
                              <Badge badgeContent={`C${index + 1}`} color="warning" sx={{ left: '1em' }} />
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cpi.result?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{data.nasabah.name_nasabah}</TableCell>
                          {cpi.step2?.[index].map((arrays, indexArrays) => (
                            <TableCell key={indexArrays}>
                              {' '}
                              {typeof arrays === 'number'
                                ? new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }).format(arrays)
                                : arrays}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
                2. Perhitungan Perfoma Relatif Alternatif
              </AccordionSummary>
              <AccordionDetails>
                <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em', marginTop: '2em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Nama Nasabah</TableCell>
                        {cpi.kriteria?.map((data, index) => (
                          <TableCell key={index}>
                            {data.type === true ? (
                              <Badge
                                badgeContent={
                                  typeof data.weight_score === 'number'
                                    ? new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      }).format(data.weight_score)
                                    : data.weight_score
                                }
                                color="primary"
                                sx={{ left: '1em' }}
                              >
                                {`C${index + 1}___`}
                              </Badge>
                            ) : (
                              <Badge
                                badgeContent={
                                  typeof data.weight_score === 'number'
                                    ? new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      }).format(data.weight_score)
                                    : data.weight_score
                                }
                                color="warning"
                                sx={{ left: '1em' }}
                              >{`C${index + 1}___`}</Badge>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cpi.result?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{data.nasabah.name_nasabah}</TableCell>
                          {cpi.step2?.[index].map((arrays, indexArrays) => (
                            <TableCell key={indexArrays}>
                              {' '}
                              {typeof arrays === 'number'
                                ? new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }).format(arrays)
                                : arrays}{' '}
                              *{' '}
                              {typeof cpi.kriteria[indexArrays].weight_score === 'number'
                                ? new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }).format(cpi.kriteria[indexArrays].weight_score)
                                : cpi.kriteria[indexArrays].weight_score}
                              {}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
                <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em', marginTop: '2em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Nama Nasabah</TableCell>
                        {cpi.kriteria?.map((data, index) => (
                          <TableCell key={index}>
                            {data.type === true ? (
                              <Badge
                                badgeContent={
                                  typeof data.weight_score === 'number'
                                    ? new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      }).format(data.weight_score)
                                    : data.weight_score
                                }
                                color="primary"
                                sx={{ left: '1em' }}
                              >
                                {`C${index + 1}___`}
                              </Badge>
                            ) : (
                              <Badge
                                badgeContent={
                                  typeof data.weight_score === 'number'
                                    ? new Intl.NumberFormat('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      }).format(data.weight_score)
                                    : data.weight_score
                                }
                                color="warning"
                                sx={{ left: '1em' }}
                              >{`C${index + 1}___`}</Badge>
                            )}
                          </TableCell>
                        ))}

                        <TableCell>Jumlah</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cpi.result?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{data.nasabah.name_nasabah}</TableCell>
                          {cpi.step3?.step3Transpose?.[index].map((arrays, indexArrays) => (
                            <TableCell key={indexArrays}>
                              {' '}
                              {typeof arrays === 'number'
                                ? new Intl.NumberFormat('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  }).format(arrays)
                                : arrays}{' '}
                            </TableCell>
                          ))}
                          <TableCell>
                            {typeof cpi.step3?.sumGroups?.[index] === 'number'
                              ? new Intl.NumberFormat('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }).format(cpi.step3?.sumGroups?.[index])
                              : cpi.step3?.sumGroups?.[index]}{' '}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={cpi.step3?.sumGroups.length + 4}></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={cpi.step3?.sumGroups.length + 3}>Nilai Min</TableCell>
                        <TableCell>
                          {typeof cpi.step3?.minValue === 'number'
                            ? new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }).format(cpi.step3?.minValue)
                            : cpi.step3?.minValue}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={cpi.step3?.sumGroups.length + 3}>Nilai Max</TableCell>
                        <TableCell>
                          {' '}
                          {typeof cpi.step3?.maxValue === 'number'
                            ? new Intl.NumberFormat('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              }).format(cpi.step3?.maxValue)
                            : cpi.step3?.maxValue}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1-content" id="panel1-header">
                3. Perhitungan Composite Performance Index (CPI) dan Perangkingan
              </AccordionSummary>
              <AccordionDetails>
                <Card variant="outlined" sx={{ boxShadow: 3, padding: '2em', marginTop: '2em' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Nama Nasabah</TableCell>
                        <TableCell>Pengerjaan</TableCell>
                        <TableCell>CPI Result</TableCell>
                        <TableCell>Rank</TableCell>
                        <TableCell>{`Status (>5)`}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cpi.result?.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{data.nasabah.name_nasabah}</TableCell>
                          <TableCell>
                            {toDecimal(cpi.step3.sumGroups[index])} - {toDecimal(cpi.step3.minValue)} / {toDecimal(cpi.step3.maxValue)}-{' '}
                            {toDecimal(cpi.step3.minValue)}
                          </TableCell>
                          <TableCell>{data.cpi_result}</TableCell>
                          <TableCell>{data.rank || 'No Rank'}</TableCell>
                          <TableCell>{data.status_ajuan}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </AccordionDetails>
            </Accordion>
          </Card>
        </CardContent>
      </Card>
    </>
  );
};

export default GeneratedTable;
