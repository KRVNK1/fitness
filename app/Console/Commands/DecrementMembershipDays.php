<?php

namespace App\Console\Commands;

use App\Enums\Membership\MembershipStatusEnum;
use App\Models\Membership;
use Illuminate\Console\Command;

class DecrementMembershipDays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'memberships:decrement-days';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Уменьшает remaining_days на 1 для всех активных абонементов';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $activeMemberships = Membership::where('status', MembershipStatusEnum::ACTIVE)
            ->where('remaining_days', '>', 0)
            ->get();

        $updatedCount = 0;
        $expiredCount = 0;

        foreach ($activeMemberships as $membership) {
            $membership->remaining_days -= 1;

            if ($membership->remaining_days <= 0) {
                $membership->status = MembershipStatusEnum::EXPIRED;
                $expiredCount++;
                $this->warn("Абонемент №{$membership->id} истек");
            }

            $membership->save();
            $updatedCount++;
        }

        $this->info('Команда отработала в: ' . now()->format('Y-m-d H:i:s'));
        $this->info("Обработано абонементов: {$updatedCount}");
        $this->info("Истекло абонементов: {$expiredCount}");

        return Command::SUCCESS;
    }
}
