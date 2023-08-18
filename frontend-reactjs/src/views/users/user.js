import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'src/config/axios'
import QRCode from 'react-qr-code'

const Users = () => {
  const [user, setuser] = useState([])
  const [visible, setVisible] = useState(false)
  const [userId, setUserId] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    getUser()
  }, [])
  const getUser = () => {
    axios.get('user').then(({ data }) => {
      setuser(data.data)
    })
  }

  const deleteUser = () => {
    axios
      .delete(`user/${userId}`)
      .then(({ data }) => {
        console.log(data)
        getUser()
      })
      .catch((err) => {
        console.log(err.response.data.message)
        alert(err.response.data.message)
      })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CRow>
            <CCol sm={6}>User List</CCol>
            <CCol sm={6} className="text-end">
              <CButton
                color="primary"
                onClick={() => {
                  nav('/user/add')
                }}
              >
                Add User
              </CButton>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                <CTableHeaderCell scope="col">QR Code</CTableHeaderCell>
                <CTableHeaderCell scope="col">masking</CTableHeaderCell>
                <CTableHeaderCell scope="col">parsing</CTableHeaderCell>
                <CTableHeaderCell scope="col">action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {user.map((e, i) => (
                <CTableRow key={e.id}>
                  <CTableDataCell>{e.email}</CTableDataCell>
                  <CTableDataCell>{e.code}</CTableDataCell>
                  <CTableDataCell>
                    <QRCode value={e.code} size={50} />
                  </CTableDataCell>
                  <CTableDataCell>{e.masking}</CTableDataCell>
                  <CTableDataCell>{e.codex}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="warning"
                      onClick={() => {
                        nav(`/user/update/${e.id}`)
                      }}
                    >
                      edit
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => {
                        setVisible(true)
                        setUserId(e.id)
                      }}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Warning</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Are You Sure</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton
            color="primary"
            onClick={() => {
              deleteUser()
              setVisible(false)
            }}
          >
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Users
