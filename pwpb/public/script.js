//saldo
let nominal = 800000000000;
let saldo = nominal;

const formatSaldo =(saldo) => {
    return saldo.toLokaleString("id-ID", {
style: "currency",
currency: "IDR",
minimumFractionDigits: 0,
    });
};
document.getElementById("saldo").innerHTML = formatSaldo(saldo);

    const transaksi = (id, harga,stock) =>{
        const inputBarangId = document.getElementById('barang_id')
        inputBarangId.value = id
        const inputHarga = document.getElementById(hargaBarang)
        inputHarga.value = harga
        const inputStock = document.getElementById('stock').value = stock

        console.log(id, harga, stock);
    };


// const bayar = (harga) => {
//     if (confirm('apakah kamu serius?') == true){

//         if (harga > saldo){
//             alert('saldo anda kurang')

//         } else{
//             saldo = saldo - harga
//             document.getElementById('saldo').innerHTML = formatSaldo(saldo)
            
//         }
//     }
// };

function barang(idBarang,hargaBarang, stock) {
    const inputBarangId = document.getElementById('barang_id')
    inputBarangId.value = idBarang
    const inputHargaBarang = document.getElementById('hargabarang')
    inputHargaBarang.value = hargaBarang
    const inputStock = document.getElementById('stock1').value = stock
    }

    // const total_harga = () => {
    //     const harga = document.getElementById('hargabarang').value
    //     const jumlahInput = document.getElementById('jumlah');
    //     const stock = document.getElementById('stock1').value
    
    //     let jumlah = parseInt(jumlahInput.value)
    //     if (jumlah > stock){
    //         alert('stock anda kurang')
    //         jumlahInput.value = stock
    //         document.getElementById('new_Stock').value = stock-jumlahInput.value
    //         document.getElementById('total').value = harga * jumlahInput.value
    //     } else{
    //         document.getElementById('new_Stock').value = stock-jumlahInput.value
    //         document.getElementById('total').value = harga * jumlahInput.value
    //     }
            
    //         }

            const total_harga = () => {
                const harga = document.getElementById('hargabarang').value
                const jumlahInput = document.getElementById('jumlah');
                const stock = document.getElementById('stock1').value
            
                let jumlah = parseInt(jumlahInput.value)
                if (jumlah > stock){
                    alert('stock anda kurang')
                    jumlahInput.value = stock
                    document.getElementById('new_Stock').value = stock-jumlahInput.value
                    document.getElementById('total').value = harga * jumlahInput.value
                } else{
                    document.getElementById('new_Stock').value = stock-jumlahInput.value
                    document.getElementById('total').value = harga * jumlahInput.value
                }
                    
                    }
                //Function Bayar
            
                const bayar = (harga) =>{
                    if (confirm('apakah kamu serius?') == true){
            
                        if (harga > saldo){
                            alert('saldo anda kurang')
            
                        } else{
                            saldo = saldo - harga
                            document.getElementById('saldo').innerHTML = formatSaldo(saldo)
                            
                        }
                    }
                }
                // const validasi_modal1 = () =>{
                //     const harga = document.getElementById('harga').value
                //     const save = document.getElementById('save').value
                //     const NamaBarang = document.getElementById('NamaBarang')
                //     console.log(harga);
                //     if (NamaBarang.value.length <= 0){
                //         if (harga % 500 == 0){
                //             if (harga.length >= 3){
                //                 save.style.display = 'block'
                //             }
                //         } else {
                //             alert('masukan harga dengan benar')
                //             save.style.display = 'none'
                //         }
                //      } else {
                //             alert('masukan data dengan benar')
                //             save.style.display = 'none'
                //         }
                //     }
            
            
            const cancel = (newStock, jumlah, idBarang, idtransaksi) => {
                console.log(newStock, idBarang, jumlah, idtransaksi)
                document.getElementById('barang_id2').value = idBarang
                document.getElementById('id_transaksi').value = idtransaksi
                document.getElementById('stockBaru').value = parseInt(newStock) + parseInt(jumlah)
            }


            const validasi_modal1 = () =>{
                const harga = document.getElementById('harga').value
                const save = document.getElementById('save').value
                const NamaBarang = document.getElementById('NamaBarang')
                console.log(harga);
                if (NamaBarang.value.length <= 0){
                    if (harga % 500 == 0){
                        if (harga.length >= 3){
                            save.style.display = 'block'
                        }
                    } else {
                        alert('masukan harga dengan benar')
                        save.style.display = 'none'
                    }
                 } else {
                        alert('masukan data dengan benar')
                        save.style.display = 'none'
                    }
                }
        
    

