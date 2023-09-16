$(document).ready(function () {

    // fungsi memanggil semua data surah dan mengisikan ke dalam contianer
    function allData() {
        // loading searcing data
        swal({
            title: "Mencari Data...",
            text: "Mohon tunggu",
            icon: "https://media.tenor.com/je-huTL1vwgAAAAi/loading-buffering.gif",
            button: false
        });

        // untuk mengosongkan datanya pada id isisurah
        $("#isiSurah").empty();

        $.ajax({
            url: 'https://quran-endpoint.vercel.app/quran',
            type: 'GET',
            success: function (res) {
                if (res.data.length == 0) {  // jika kosong tampilkan aksi dibawahnya
                    return swal('', 'Data tidak di temukan');
                } else {
                    // looping data surah
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];  // masukkan ke dalam variabel data setiap ketemu pada index i

                        // create element yang menampilkan dari hasil looping datanya
                        const isiSurah = `<ol class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                        
                            <a href="" class="ms-2 me-auto nav-link">
                                <div>
                                    <div class="fw-bold">${element.asma.id.long}</div>
                                    ${element.type.id} | ${element.ayahCount} Ayat
                                </div>
                            </a>
                            <div class="fw-bold ms-2 me-auto ">${element.asma.ar.short}</div>
                            <audio controls>
                                <source src=${element.recitation.full} type="audio/mpeg">
                            </audio>
                        </ol>`

                        // masukkan datanya dari variable isiSurah yang sudah di buat dari looping data di atas
                        $("#isiSurah").append(isiSurah);
                    }
                    swal.close(); // menutup swal loading
                }
            }
        })

    };

    // menampilkan beberapa imam dan tes suara alfatihah
    function funcImam() {
        // swal loading 
        swal({
            title: "Mencari Data...",
            text: "Mohon tunggu",
            icon: "https://media.tenor.com/je-huTL1vwgAAAAi/loading-buffering.gif",
            button: false
        });

        $("#isiSurah").empty();  // mengosongkan datanya ketika baru di klik

        $.ajax({
            url: 'https://quran-endpoint.vercel.app/imam',
            type: 'GET',
            success: function (res) {
                // jika datanya kosong tampikan swal
                if (res.data.length == 0) {
                    return swal('', 'Data tidak di temukan');
                } else {
                    for (let i = 0; i < 8; i++) {    // looping data imam hanya sampai 8 saja
                        const element = res.data[i];
                        // console.log();     // hanya untuk tes data

                        // pemanggilan surah dari id imam yang ketemu looping di atas sampai 8
                        $.ajax({
                            url: `https://quran-endpoint.vercel.app/quran?imamId=${element.id}`,
                            type: 'GET',
                            success: function (surahImam) {
                                if (surahImam.data.length == 0) {
                                    return swal('Data tidak di temukan')
                                } else {
                                    for (let sh = 0; sh < surahImam.data.length; sh++) {  // looping surah dari imam yang ketemu
                                        const dataSurah = surahImam.data[sh];

                                        // untuk mencari data pertama saja (surah alfatihah untuk tes data suara)
                                        if (dataSurah.number == 1) {
                                            const mp3 = dataSurah.recitation.full;  // ketika mp3 ketemu di masukkan ke dalam variabel
                                            const isiSurah = `<ol class="list-group">
                                                    <li class="list-group-item d-flex justify-content-between align-items-start">
                                                    <a href="" class="ms-2 me-auto nav-link">
                                                        <div>
                                                            <div class="fw-bold">${element.name}</div>
                                                            
                                                        </div>
                                                    </a>
                                                    <audio controls>
                                                        <source src=${mp3} type="audio/mpeg">
                                                    </audio>
                                                </ol>`
                                            $("#isiSurah").append(isiSurah);
                                        }
                                    }

                                }
                                swal.close();
                            }
                        })

                    }
                }
            }
        })
    };


    function detailSurah() {
        swal({
            title: "Mencari Data...",
            text: "Mohon tunggu",
            icon: "https://media.tenor.com/je-huTL1vwgAAAAi/loading-buffering.gif",
            button: false
        });

        // untuk mengosongkan datanya pada id isisurah
        $("#isiSurah").empty();

        $.ajax({
            url: 'https://quran-endpoint.vercel.app/quran',
            type: 'GET',
            success: function (res) {
                if (res.data.length == 0) {  // jika kosong tampilkan aksi dibawahnya
                    return swal('', 'Data tidak di temukan');
                } else {
                    // looping data surah
                    for (let i = 0; i < res.data.length; i++) {
                        const element = res.data[i];  // masukkan ke dalam variabel data setiap ketemu pada index i

                        // create element yang menampilkan dari hasil looping datanya
                        const isiSurah = `<ol class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                    
                        <a href="" class="ms-2 me-auto nav-link">
                            <div>
                            console..log(${element.number})
                                <div class="fw-bold">${element.asma.id.long}</div>
                                ${element.type.id} | ${element.ayahCount} Ayat
                            </div>
                        </a>
                        <div class="fw-bold ms-2 me-auto ">${element.asma.ar.short}</div>
                        <audio controls>
                            <source src=${element.recitation.full} type="audio/mpeg">
                        </audio>
                    </ol>`

                        // masukkan datanya dari variable isiSurah yang sudah di buat dari looping data di atas
                        $("#isiSurah").append(isiSurah);
                    }
                    swal.close(); // menutup swal loading
                }
            }
        })
    };



    $("#gataudah").click(function () {
        swal({
            title: 'Al - Fatihah',
            html: "<ol> <li>tes</li><li>tes</li><li>tes</li> <li>tes</li>   <li>tes</li><li>tes</li><li>tes</li><li>tes</li></ol>",
            showCloseButton: true,
            button: true,
            confirmButtonText:
                'Close'
        });
    });

    $("#swe").click(function(){
        swal('emmmm');
    })

    // memanggil fungsi allData menampilkan semua surah ketika navbar surah di klik
    $("#surah").click(function () {
        allData();
    });

    // memanggil fungsi imam dan  menampilkan tes suara dari imam
    $("#imam").click(function () {
        funcImam();
    });
});



// test swal  => untuk menampilkan immg panjang
// Swal.fire({
//     imageUrl: 'https://placeholder.pics/svg/300x1500',
//     imageHeight: 1500,
//     imageAlt: 'A tall image'
//   })

// untuk menampilkan tanda close di atasnya
// Swal.fire({
//     title: '<strong>HTML <u>example</u></strong>',
//     icon: 'info',
//     html:
//       'You can use <b>bold text</b>, ' +
//       '<a href="//sweetalert2.github.io">links</a> ' +
//       'and other HTML tags',
//     showCloseButton: true,
//     showCancelButton: true,
//     focusConfirm: false,
//     confirmButtonText:
//       '<i class="fa fa-thumbs-up"></i> Great!',
//     confirmButtonAriaLabel: 'Thumbs up, great!',
//     cancelButtonText:
//       '<i class="fa fa-thumbs-down"></i>',
//     cancelButtonAriaLabel: 'Thumbs down'
//   })


// fixing swall
// Swal.fire({
//     title: '<strong>HTML <u>example</u></strong>',
//     html: "<ol> <li>tes</li><li>tes</li><li>tes</li> <li>tes</li>   <li>tes</li><li>tes</li><li>tes</li><li>tes</li></ol>",
//     showCloseButton: true,
//     confirmButtonText:
//       'Close'
//   })