<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Tgroup;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('details');
            $table->boolean('status');
            $table->datetime('complete_at')->nullable();
            $table->string('type');
            $table->foreignIdFor(Tgroup::class)->nullable();
            $table->time('time')->nullable();
            $table->string('count')->nullable();
            $table->string('value')->nullable();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
