<?php

namespace App\Http\Controllers;

use App\Mail\TestMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailTestController extends Controller
{
	public function send(Request $request)
	{
		$to = $request->query('to') ?: env('MAIL_TO_ADDRESS') ?: 'test@example.com';
		Mail::to($to)->send(new TestMail());
		return response()->json(['sent' => true, 'to' => $to]);
	}
}
