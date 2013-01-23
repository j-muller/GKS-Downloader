/**
 * @@ScriptName: content_script.js
 * @@Author: Jeffrey Muller<jeffrey.muller92@gmail.com>
 * @@Create Date: 2013-01-23 00:00:03
 * @@Modify Date: 2013-01-23 01:49:42
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

var html = document.documentElement.innerHTML;

chrome.extension.sendMessage(null, html);
