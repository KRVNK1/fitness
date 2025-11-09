<?php

namespace Database\Seeders\Memberships;

use App\Enums\Membership\MembershipStatusEnum;
use App\Models\Membership;
use App\Models\MembershipType;
use App\Models\TrainerInfo;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MembershipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $t1 = User::where('id', 3)->firstOrFail();
        $t2 = User::where('id', 4)->firstOrFail();
        $t3 = User::where('id', 5)->firstOrFail();
        $t4 = User::where('id', 6)->firstOrFail();
        $t5 = User::where('id', 7)->firstOrFail();
        $t6 = User::where('id', 8)->firstOrFail();
        $t7 = User::where('id', 9)->firstOrFail();
        $t8 = User::where('id', 10)->firstOrFail();
        $t9 = User::where('id', 11)->firstOrFail();

        $membershipType = MembershipType::where('slug', 'infinity')->firstOrFail();

        $startDate = Carbon::now();
        $endDate = $startDate->copy()->addYear(1);

        $remainingDays = $startDate->diffInDays($endDate);

        foreach ([$t1, $t2, $t3, $t4, $t5, $t6, $t7, $t8, $t9] as $trainer) {
            Membership::create([
                'user_id'            => $trainer->id,
                'membership_type_id' => $membershipType->id,
                'remaining_days'     => $remainingDays,
                'start_date'         => $startDate,
                'end_date'           => $endDate,
                'status'             => MembershipStatusEnum::ACTIVE,
            ]);
        }
    }
}
