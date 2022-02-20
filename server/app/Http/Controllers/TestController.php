<?php

namespace App\Http\Controllers;

use App\Listing;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestController extends Controller
{
    //

    public function read_file_json()
    {
        $str = file_get_contents('/Users/khanh/Downloads/vn.json');
        $json = json_decode($str, true);
        return array_values(array_unique(array_column($json, 'admin_name')));
        // return $json[0];
    }

    public function test_2(Request $request)
    {
        // (StartA > StartB? Start A: StartB) <= (EndA < EndB? EndA: EndB)
        $checkin_date = Carbon::createFromFormat('Y-m-d', $request->checkin_date)->addDay();
        $checkout_date = $request->checkout_date;

        $data = DB::table('listing')
            ->join('reservation', 'listing.id', '=', 'reservation.listing_id')
            ->where([
                ['listing.city_id', '=', $request->city_id],
                ['reservation.checkin_date', '<=', $checkout_date],
                ['reservation.checkout_date', '>=', $checkin_date],
                ['reservation.checkout_date', '>', Carbon::now()],
            ])
            // ->where('reservation.checkin_date', '>', $checkout_date)
            // ->orWhere('reservation.checkout_date', '<', $checkin_date)
            ->select(DB::raw('listing.id'))
            // ->select(DB::raw('listing.id, listing.name, count(*) as count'))
            ->groupBy('listing.id')
            ->pluck('listing.id')

            // ->havingRaw('count(*) = 0')
            // ->select('listing.id', 'listing.name')
            // ->get()

        ;
        $result = Listing::whereNotIn('id', $data)->get();


        return $result;
    }
}

// (AB) ngang !-- (A ngang + B ngang) ngang
// (10) n = 1 !-- (1 n + 0 n) n = (0 + 1) n = 0
// (11) n = 0 !-- (1 n + 1 n) n = (0 + 0) n = 1
// (00) n = 1 !-- (0 n + 0 n) n = (1 + 1) n = 0
// (01) n = 1 !-- (0 n + 1 n) n = (1 + 0) n = 0

// (AB) n = A ngang + B ngang
// => ((StartDate1 <= EndDate2) and (StartDate2 <= EndDate1)) negative
// (StartDate1 <= EndDate2) negative or (StartDate2 <= EndDate1) negative
// startDate1 > endDate2 or startDate2 > endDate1