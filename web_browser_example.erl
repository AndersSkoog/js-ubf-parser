-module(web_browser_example).
-behaviour(ubf_plugin_stateful).

-include("ubf.hrl").

-export([info/0, description/0,
         managerStart/1, managerRestart/2, managerRpc/2,
         handlerStart/2, handlerRpc/4, handlerStop/3]).

%% Import needed modules
-import(ubf_plugin_handler, [sendEvent/2, install_handler/2]).

%% Define the prizes
-define(PRIZES, #{
    1 => "a brand new bike",
    2 => "a vacation to the Bahamas",
    3 => "a free dinner",
    4 => "a mystery box",
    5 => "a movie ticket"
}).

%%% Plugin information
info() -> "Simple Game Plugin".

description() -> "A simple game where you enter a secret code, pick a prize, and reach the end state.".

%%% Manager Functions
managerStart(_) -> {ok, manager_state}.  
managerRestart(_,_) -> ok.  %% No restart logic needed  
managerRpc(_, State) -> {{error, unknown_rpc}, State}.  %% No special manager RPCs  

%%% Handler Functions

%% Start in locked state
handlerStart(_, _ManagerPid) ->
    {accept, locked, undefined}. 

%% Handling messages in different states
handlerRpc(locked, {secret, "aladin"}, _State, _Env) ->
    {{ok, "choose a number between 1-5 to get your prize"}, picking_prize, undefined};
handlerRpc(locked, {secret, _WrongPassword}, State, _Env) ->
    {{error, "incorrect password, access denied"}, locked, State};

handlerRpc(picking_prize, {pick_prize, N}, _State, _Env) when N >= 1, N =< 5 ->
    Prize = maps:get(N, ?PRIZES, "an unknown prize"),
    {{ok, "you have won: " ++ Prize}, end_state, undefined};
handlerRpc(picking_prize, _, State, _Env) ->
    {{error, "Invalid choice, pick a number between 1-5"}, picking_prize, State};

handlerRpc(end_state, _, State, _Env) ->
    {{"game over"}, end_state, State}.

%% Stopping the handler
handlerStop(_Pid, _Reason, _ManagerData) ->
    ok.
