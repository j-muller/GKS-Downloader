/**
 * @@ScriptName: popup.js
 * @@Author: Jeffrey Muller<jeffrey.muller92@gmail.com>
 * @@Create Date: 2013-01-22 23:38:38
 * @@Modify Date: 2013-01-23 01:49:35
 *
 * Copyright (C) 2013 Jeffrey Muller
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$(function() {
    var bkg = chrome.extension.getBackgroundPage();
    var data = bkg.gks.get_data();

    if (data.nb_results > 0) {
        console.log(data)
        $('.nb-torrents').text(data.nb_results + ' torrents trouvés. :-)');
        $('.torrents').empty().append('<ul></ul>');

        $(data.torrents).each(function(idx, e) {
            $('.torrents ul').append('<li><a href="' + e.link +'" alt="' + e.title + '" title="' + e.title + '" target="_blank">' + e.title + '</a></li>');
        });
    }
});
