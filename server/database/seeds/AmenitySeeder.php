<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AmenitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // amenities
        $list_amenity = [
            [
                'amenity_type_id' => 1,
                'amenities' => [
                    'Wifi', 'Internet', 'TV', 'Điều hòa', 'Quạt', 'Máy sấy', 'Bình nóng lạnh', 'Máy giặt', 'Tủ lạnh'
                ]
            ],
            [
                'amenity_type_id' => 2,
                'amenities' => [
                    'Tủ quần áo', 'Móc treo quần áo', 'Đệm bổ sung', 'Bàn trang điểm'
                ]
            ],
            [
                'amenity_type_id' => 3,
                'amenities' => [
                    'Bồn tắm', 'Buồng tắm đứng', 'Toilet', 'Đèn sưởi nhà tắm', 'Khăn tắm', 'Dầu gội, dầu xả', 'Sữa tắm/Xà phòng', 'Giấy vệ sinh', 'Kem/Bàn chải đánh răng'
                ]
            ],
            [
                'amenity_type_id' => 4,
                'amenities' => [
                    'Bếp điện/Bếp từ', 'Bếp ga', 'Bếp nướng BBQ', 'Nồi lẩu', 'Nồi cơm điện', 'Ấm đun nước', 'Gia vị nấu ăn cơ bản', 'Lò nướng', 'Lò vi sóng', 'Máy nướng bánh mì', 'Dụng cụ nấu ăn', 'Máy rửa bát', 'Than củi'
                ]
            ],
            [
                'amenity_type_id' => 5,
                'amenities' => [
                    'Còi báo cháy', 'Bình chữa cháy', 'Khóa chống trộm', 'Két an toàn'
                ]
            ],
            [
                'amenity_type_id' => 6,
                'amenities' => [
                    'Ban công', 'Khu vực BBQ riêng', 'Sân/Vườn riêng', 'Bể bơi riêng', 'Bãi đỗ xe riêng', 'Ghế massage', 'Ghế tantra', 'Nhà thông minh', 'Hộp y tế', 'Máy pha cà phê', 'Smart TV/Internet TV', 'Karaoke', 'Lò sưởi'
                ]
            ],
            [
                'amenity_type_id' => 7,
                'amenities' => [
                    'View vịnh', 'View thành phố', 'View biển', 'View cảng', 'View sông', 'View hồ', 'View núi đồi', 'View bể bơi', 'View sân vườn', 'View công viên', 'View rừng cây'
                ]
            ],
        ];
        foreach ($list_amenity as $amenity) {
            foreach ($amenity['amenities'] as $item) {
                DB::table('amenities')->insert([
                    'name' => $item,
                    'amenity_type_id' => $amenity['amenity_type_id']
                ]);
            }
        }
    }
}
