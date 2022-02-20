<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // city
        // $city = ['Hà Nội', 'TP.Hồ Chí Minh', 'Vũng Tàu', 'Đà Lạt', 'Đà Nẵng', 'Nha Trang', 'Quảng Ninh', 'Hội An'];
        $city = [
            "Hồ Chí Minh",
            "Hà Nội",
            "Hải Phòng",
            "Cần Thơ",
            "Đồng Nai",
            "Quảng Nam",
            "Bắc Ninh",
            "Hải Dương",
            "Nghệ An",
            "Thừa Thiên-Huế",
            "Thanh Hóa",
            "Khánh Hòa",
            "Nam Định",
            "Đắk Lắk",
            "Thái Nguyên",
            "Bà Rịa-Vũng Tàu",
            "Cà Mau",
            "Bình Định",
            "Sóc Trăng",
            "An Giang",
            "Phú Thọ",
            "Thái Bình",
            "Quảng Ngãi",
            "Lâm Đồng",
            "Kiến Giang",
            "Bình Dương",
            "Phú Yên",
            "Bạc Liêu",
            "Đồng Tháp",
            "Bình Thuận",
            "Ninh Thuận",
            "Quảng Ninh",
            "Hà Tĩnh",
            "Quảng Bình",
            "Lạng Sơn",
            "Gia Lai",
            "Long An",
            "Trà Vinh",
            "Ninh Bình",
            "Tây Ninh",
            "Tiền Giang",
            "Hòa Bình",
            "Kon Tum",
            "Vĩnh Long",
            "Hậu Giang",
            "Yên Bái",
            "Quảng Trị",
            "Lào Cai",
            "Bến Tre",
            "Bắc Giang",
            "Cao Bằng",
            "Bình Phước",
            "Hà Giang",
            "Tuyên Quang",
            "Bắc Kạn",
            "Sơn La",
            "Đà Nẵng",
            "Hưng Yên",
            "Hà Nam",
            "Vĩnh Phúc",
            "Điện Biên",
            "Lai Châu",
            "Đắk Nông"
        ];

        foreach ($city as $item) {
            DB::table('city')->insert([
                'name' => $item
            ]);
        }
    }
}
