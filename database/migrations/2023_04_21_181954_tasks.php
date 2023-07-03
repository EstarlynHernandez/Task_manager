<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\Tgroup;
use App\Models\Task;

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
            $table->longText('details')->nullable();
            $table->boolean('status');
            $table->datetime('complete_at')->nullable();
            $table->string('type');
            $table->foreignIdFor(Tgroup::class)->nullable();
            $table->date('date')->nullable();
            $table->integer('count')->nullable();
            $table->integer('value')->nullable();
            $table->integer('action')->nullable();
            $table->string('family')->nullable();
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
