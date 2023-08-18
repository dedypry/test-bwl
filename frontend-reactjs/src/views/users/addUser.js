import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'src/config/axios'
const { CForm, CFormLabel, CFormInput, CCard, CButton, CCardBody } = require('@coreui/react')

const AddUser = () => {
  const nav = useNavigate()
  const param = useParams()
  const [form, setData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const changeData = (key, value) => {
    setData({
      ...form,
      [key]: value,
    })
  }

  useEffect(() => {
    if (param.id) {
      axios.get(`user/${param.id}`).then(({ data }) => {
        setData({
          ...form,
          id: param.id,
          email: data.data.email,
          name: data.data.name,
        })
      })
    }
  })

  const submit = () => {
    axios
      .post('user', form)
      .then(({ data }) => {
        nav('/dashboard')
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
              <CFormInput
                type="text"
                id="exampleFormControlInput1"
                placeholder="name"
                value={form.name}
                onChange={(e) => changeData('name', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
              <CFormInput
                type="email"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => changeData('email', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Pasword</CFormLabel>
              <CFormInput
                type="password"
                id="exampleFormControlInput1"
                placeholder="***"
                onChange={(e) => changeData('password', e.target.value)}
              />
            </div>
          </CForm>
          <CButton onClick={() => submit()}>Submit</CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddUser
