<?php

namespace Database\Seeders;

use Database\Seeders\MembershipTypes\MembershipSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            MembershipSeeder::class,
        ]);
    }
}
