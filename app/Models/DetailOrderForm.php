<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailOrderForm extends Model
{
    protected $table = 'detail_order_forms';
    public $timestamps = true;
    use HasFactory;
}
