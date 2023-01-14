import React from "react";
import Axios from 'axios';

const LinkFakeAPI = "http://localhost:2000/data"

export default class FakeAPI_CRUD extends React.Component{

    state = {
        data: null,
        show: false,
        tambahData: true,
        selected: null
    }

    componentDidMount(){
        this.getFakeAPI()
    }

// FUNCTION
    // 1. Read
    getFakeAPI = () => {
        Axios.get(LinkFakeAPI)
        .then((res) => {
            console.log(res.data)
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // 2. Create
    submitFakeAPI = () => {
        // untuk mengirim data API harus berbentuk objek
        let inputTitle = this.refs.title.value
        let inputPenerbit = this.refs.penerbit.value
        let inputTahun = this.refs.tahun.value

        if(inputTitle && inputPenerbit && inputTahun){
            Axios.post(LinkFakeAPI, {
                title: inputTitle, 
                penerbit: inputPenerbit, 
                tahun: inputTahun
            })
            .then((res) => {
                console.log(res)
                if(res.status === 201){
                    alert('Data berhasil ditambah')
                    this.getFakeAPI()
                    this.refs.title.value = ''
                    this.refs.penerbit.value = ''
                    this.refs.tahun.value = ''
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('Masukan Seluruh Data')
        }
        this.setState({tambahData: true})

    }

    // 3. Update
    updateFakeAPI = () => {
        let updateTitle = this.refs.titleEdit.value
        let updatePenerbit = this.refs.penerbitEdit.value
        let updateTahun = this.refs.tahunEdit.value

        if(updateTitle && updatePenerbit && updateTahun){
            Axios.patch(LinkFakeAPI + '/' + this.state.selected, {
                title: updateTitle,
                penerbit: updatePenerbit,
                tahun: updateTahun
            })
            .then((res) => {
                console.log(res)
                if(res.status === 200){
                    alert("Data Berhasil Diubah")
                    this.setState({selected: null})
                    this.getFakeAPI()
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert("Masukan seluruh data")
        }
    }

    // 4. Delete
    deleteFakeAPI = (id) => {
        let resultConfirm = window.confirm('Anda yakin akan menghapus?')
        if(resultConfirm === true){
            Axios.delete(LinkFakeAPI + '/' + id)
            .then((res) => {
                console.log(res)
                alert("Data Berhasil dihapus")
                this.getFakeAPI()
            })
            .catch((err) => {
                console.log(err)
            })
        }else{

        }
    }

    render(){
        if(this.state.data === null){
            return(
                <div>
                    Loading ...
                </div>
            )
        }
        
        return(
            <div>
                {
                    this.state.tambahData?
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <input className="btn btn-primary me-md-2" type="button" value="Tambah Data" onClick={() => this.setState({show: true, tambahData: false})} />
                        </div>
                    :
                    null
                }
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Penerbit</th>
                            <th scope="col">Tahun</th>
                            <th scope="col"><center>Action</center></th>
                        </tr>
                    </thead>

                    <tbody>

                    {
                        this.state.data.map((value, index) => {
                            if(this.state.selected === value.id){
                                return(
                                    <tr key={index}>
                                        <th scope="row">{value.id}</th>
                                        <td>
                                            <input type='text' ref='titleEdit' defaultValue={value.title} />
                                        </td>
                                        <td>
                                            <input type='text' ref='penerbitEdit' defaultValue={value.penerbit} />
                                        </td>
                                        <td>
                                            <input type='text' ref='tahunEdit' defaultValue={value.tahun} />
                                        </td>
                                        <td>
                                            <center>
                                                <input type="button" value="Save" className="btn btn-success mx-3" onClick={this.updateFakeAPI} />
                                                <input type="button" value="Cancel" className="btn btn-danger" onClick={() => this.setState({selected: null})} />
                                            </center>
                                        </td>
                                    </tr>
                                )
                            }
                            return(
                                <tr key={index}>
                                    <th scope="row">{value.id}</th>
                                    <td>{value.title}</td>
                                    <td>{value.penerbit}</td>
                                    <td>{value.tahun}</td>
                                    <td>
                                        <center>
                                            <input type="button" value="Edit" className="btn btn-warning mx-3" onClick={() => this.setState({selected: value.id})} />
                                            <input type="button" value="Delete" className="btn btn-danger" onClick={() => this.deleteFakeAPI(value.id)} />
                                        </center>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>

                {
                    this.state.show?
                        <div className="mt-5">
                            <div className="mt-5">
                            <h1>Input Form</h1>
                            <input type='text' ref="title" placeholder="Title" className="form-control w-50" />
                        </div>
                        <div className="mt-3">
                            <input type='text' ref="penerbit" placeholder="Penerbit" className="form-control w-50" />
                        </div>
                        <div className="mt-3">
                            <input type='number' ref="tahun" placeholder="Tahun" className="form-control w-50" />
                        </div>
                        <input type='button' value='Create' className="btn btn-primary mt-3 m-3" onClick={this.submitFakeAPI}/>
                        <input type='button' value='Cancel' className="btn btn-danger mt-3 m-3" onClick={() => this.setState({show: false, tambahData: true})} />
                        </div>
                    :
                        null
                }
            </div>
        )
    }
}