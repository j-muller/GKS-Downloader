/**
 * @@ScriptName: gks.handler.js
 * @@Author: Jeffrey Muller<jeffrey.muller92@gmail.com>
 * @@Create Date: 2013-01-22 23:46:58
 * @@Modify Date: 2013-01-23 01:57:40
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

var gks = {
    // URL vers le serveur mandataire
    _url: "http://gks.muller.so/",

    // Reference vers l'onglet courant
    _tab: null,

    // Reference vers les données JSON renvoyées par le serveur mandataire
    _data: null,

    // Récupération du titre depuis Allocine
    get_allocine_title: function(dom) {
        var title = false;

        // Tente de chercher le "titre original"
        // La magie de jQuery...
        title = $($(dom).find('.tab_col_first li span')[0])
                                    .empty().parent().text();
        title = (title == "") ? $(dom).find('ul li h1').text() : title;

        return title;
    },

    // Recuperation du titre depuis IMDb
    get_imdb_title: function(dom) {
        var title = false;

        // Tente de chercher le "titre original"
        title = $(dom).find('.header').find('span')
                      .empty().parent().text().trim();

        return title;
    },

    // Recuperation du titre depuis JeuxVideo.com
    get_jeuxvideocom_title: function(dom) {
        var title = false;

        title = $(dom).find('#nom_jeu h1 strong').text();

        return title;
    },

    // Récupération du titre de l'item
    get_title: function(dom, tab) {
        var title = false;

        this._tab = tab;
        if (tab.url.match(/^http:\/\/www.allocine.fr/))
            title = this.get_allocine_title(dom);
        else if (tab.url.match(/^http:\/\/www.jeuxvideo.com\/jeux\//))
            title = this.get_jeuxvideocom_title(dom);
        else if (tab.url.match(/^http:\/\/www.imdb.com\/title\//))
            title = this.get_imdb_title(dom);

        return title;
    },

    // Requete au serveur mandataire
    post_request: function(title) {
        var that = this;

        $.post(this._url, {
            title: title
        }, function(data) {
            if (!data.error_description)
            {
                that._data = data;
                that.set_badge_text(data.nb_results, that._tab.id);
                if (data.nb_results > 0)
                    that.set_notification(data.nb_results);
            }
        });
    },

    // Ajoute un "badge" à l'icône Gks
    set_badge_text: function(nb, tab_id) {
        chrome.browserAction.setBadgeText({
            'text': nb.toString(),
            'tabId': tab_id
        });
    },

    // Ajoute une notification en bas a droite de l'ecran
    set_notification: function(nb) {
        var notif = webkitNotifications.createNotification(
            'images/desktop-notif.png',
            'Il y a des torrents !',
            nb + ' torrents correspondent à cet article !'
        );

        notif.show();

        setTimeout(function() {
            notif.cancel();
        }, 5000);
    },

    get_data: function() {
        return this._data;
    }
};
