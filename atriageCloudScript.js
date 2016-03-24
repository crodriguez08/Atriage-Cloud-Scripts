// CloudScript Test

handlers.getAccountInfo = function (args)
{
	var result = server.GetUserAccountInfo({ PlayFabId: currentPlayerId});
	
	return result;
}

handlers.SavePlayerStats = function (args)
{
	var result = server.GetUserStatistics({PlayFabId: currentPlayerId}).UserStatistics;
	
	result.xp = args.playerXp;
	result.rank = args.playerRank;
	
	server.UpdateUserStatistics({
		PlayFabId: currentPlayerId,
		UserStatistics: result
	});
}

handlers.SaveSpecificPlayerLoseStats = function (args)
{
	var result = server.GetUserStatistics({PlayFabId: args.player_id}).UserStatistics;
	
	result.losses += 1;
	
	server.UpdateUserStatistics({
		PlayFabId: args.player_id,
		UserStatistics: result
	});
}

handlers.SavePlayerWinStats = function (args)
{
	var result = server.GetUserStatistics({PlayFabId: currentPlayerId}).UserStatistics;
	
	result.wins += 1;
	result.xp = args.playerXp;
	result.rank = args.playerRank;
	result.bp += args.playerBp;
	
	server.UpdateUserStatistics({
		PlayFabId: currentPlayerId,
		UserStatistics: result
	});
}

handlers.SavePlayerLoseStats = function (args)
{
	var result = server.GetUserStatistics({PlayFabId: currentPlayerId}).UserStatistics;
	
	result.losses += 1;
	result.xp = args.playerXp;
	result.rank = args.playerRank;
	result.bp += args.playerBp;
	
	server.UpdateUserStatistics({
		PlayFabId: currentPlayerId,
		UserStatistics: result
	});
}

handlers.player1Wins = function (args)
{
	// Upon Player 2 disconnection, server will give player 1 the win and player 2 the loss.
	
	var id1 = args.player1_id;
	var id2 = args.player2_id;
	
	var player1Stats = server.GetUserStatistics({ PlayFabId: id1}).UserStatistics;
	var player2Stats = server.GetUserStatistics({ PlayFabId: id2}).UserStatistics;
	
	player1Stats.wins += 1;
	player2Stats.losses += 1;
	
	server.UpdateUserStatistics({
		PlayFabId: id1,
		UserStatistics: player1Stats
	});
	
	server.UpdateUserStatistics({
		PlayFabId: id2,
		UserStatistics: player2Stats
	});
}

handlers.player2Wins = function (args)
{
	// Upon Player 1 disconnection, server will give player 2 the win and player 1 the loss.
	
	var id1 = args.player1_id;
	var id2 = args.player2_id;
	
	var player1Stats = server.GetUserStatistics({ PlayFabId: id1}).UserStatistics;
	var player2Stats = server.GetUserStatistics({ PlayFabId: id2}).UserStatistics;
	
	player2Stats.wins += 1;
	player1Stats.losses += 1;
	
	server.UpdateUserStatistics({
		PlayFabId: id1,
		UserStatistics: player1Stats
	});
	
	server.UpdateUserStatistics({
		PlayFabId: id2,
		UserStatistics: player2Stats
	});
}

handlers.LoadUserStats = function (args)
{
	var result = server.GetUserStatistics({ PlayFabId: currentPlayerId}).UserStatistics;
	
	if (result.wins == null || result.losses == null || result.rank == null || result.bp == null || result.xp == null)
	{
		result.wins = 0;
		result.losses = 0;
		result.rank = 1;
		result.bp = 0;
		result.xp = 0;
		
		server.UpdateUserStatistics({
			PlayFabId: currentPlayerId,
			UserStatistics: result
		});
	}
	
	return result;
}