<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ListingTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // listing_type
        $listing_types = [
            [
                'name' => 'Homestay',
                'description' => 'Không gian lưu trú nơi các vị khách được sinh hoạt trong những ngôi nhà dân theo phong cách sống bản địa.'
            ],
            [
                'name' => 'Nhà riêng',
                'description' => 'Loại chỗ ở độc lập, được xây dựng trên thửa đất riêng biệt và thường không chung tường với nhà kế bên.'
            ],
            [
                'name' => 'Biệt thự',
                'description' => 'Loại chỗ ở có diện tích lớn, sang trọng, có khuôn viên bao quanh và chủ yếu phục vụ nhu cầu nghỉ dưỡng.'
            ],
            [
                'name' => 'Chung cư',
                'description' => 'Căn hộ khép kín, cùng tập trung trên một mặt sàn trong một tòa nhà lớn.'
            ],
            [
                'name' => 'Studio',
                'description' => 'Căn hộ nhỏ kết hợp phòng khách, phòng ngủ và phòng bếp trong cùng một không gian.'
            ],
            [
                'name' => 'Căn hộ dịch vụ',
                'description' => 'Căn hộ đầy đủ nội thất, tiện nghi; chủ yếu phục vụ khách lưu trú dài hạn và cung cấp các dịch vụ giống như một khách sạn thu nhỏ.'
            ],
            [
                'name' => 'Nhà tập thể/ Cư xá',
                'description' => 'Loại chỗ ở tương tự chung cư nhưng nằm trong một tòa nhà thấp (4-6 tầng) và cũ kỹ, thường được xây dựng trước năm 1990.'
            ],
            
        ];

        foreach($listing_types as $item) {
            DB::table('listing_type')->insert([
                'name' => $item['name'],
                'description' => $item['description']
            ]);
        }
    }
}
