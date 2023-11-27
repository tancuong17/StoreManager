<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderForm extends Model
{
    protected $table = 'order_forms';
    public $timestamps = true;
    use HasFactory;
}
