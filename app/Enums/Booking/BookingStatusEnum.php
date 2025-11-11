<?php

namespace App\Enums\Booking;

class BookingStatusEnum
{
    public const BOOKED = 'booked'; // забронировано
    public const ATTENDED = 'attended'; // присутствовал
    public const MISSED = 'missed'; // отсутствовал
}