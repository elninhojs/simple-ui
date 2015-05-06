/**
 * Componente para exibição e enfileiramento de mensagens na UI.
 * @author eugenio.filho
 * @date 18/09/2012
 * 
 */



Messages = {	
};



Messages.DIV_ROOT_HTML = '<div class="messages-div-root"></div>';
Messages.DIV_MSG_ITEM_HTML = '<div class="messages-div-message-item" style="display:none;" index="#index#"><div class="messages-div-message-item-body">#text#</div></div>';
Messages.DIV_MSG_TITLE_HTML = '<span class="messages-div-message-item-title">#title#</span>';
Messages.DIV_BTN_CLOSE_HTML = '<a class="messages-div-message-item-btn-close" href="javascript:function(){return false;};"><span>x</span></a>'; 
Messages.DIV_MSG_HEAD_HTML = '<div class="messages-div-message-item-head"></div>';
Messages.DIV_IMG_HTML = '<div class="messages-div-message-item-img"></div>';
Messages.DIV_FECHAR_TODOS_HTML = '<div class="messages-div-message-item-fechar-todos" style="display:none;">#text#</div>';

/**
 * options.image
 * true ou false para renderizar ou não um div 32 X 32 para receber um bgimage
 * default true
 * 
 * options.button
 * Define se o btn de close será ou não renderizado na UI
 * 
 * options.closeAll
 * Define se o botão de fechar todos será criado automaticamente na UI quando necessário. default true
 * 
 * options.closeAllLabel
 * Label para o botão de close all. Default "Fechar Todos"
 */
Messages.options = {button:true, image:true, closeAll:true, closeAllLabel:'Fechar Todos', listenerWindowScroll:true, time:10000};

Messages.updatePositionDivRoot = function(top, hide){
	var divRoot = $('.messages-div-root');
	if(hide==true){
		$(divRoot).hide();		
	}
	window.setTimeout(function(){
		if($(divRoot).size()==1){
			$(divRoot).css('top',new Number(top)+10);
			$(divRoot).fadeIn('normal');
		}		
	}, 200);
}; 

Messages.init = function(options){
	if(options){
		Messages.options = options;	
	}
	
	if(Messages.options.listenerWindowScroll==true){
		$(window).scroll(function(e) {
			
			Messages.updatePositionDivRoot(document.body.scrollTop, true);
			
		});		
	}
	
};



Messages.remove=function(index){
	var divRoot = $('.messages-div-root');
	if($(divRoot).size()!=0){
		var currentItem = $(divRoot).find('*[index='+index+'].messages-div-message-item');
		$(currentItem).hide('normal', function(){
			
			if($(divRoot).find('.messages-div-message-item').size()==1){
				$(divRoot).remove();
				return;
			}
			
			if($(divRoot).find('.messages-div-message-item').size()==2){
				$(divRoot).find('.messages-div-message-item-fechar-todos').remove();
				
			}
			$(this).remove();
		});
	}
};

Messages.removeAll = function(){
	$('.messages-div-root').slideUp('normal',function(){
		$(this).remove();
		
	});
};

Messages.index = 0;
Messages.add = function(text,title,imgDivClass){
	var options = Messages.options;
	
	Messages.index++;
	var parent = $('body');
	
	if($(parent).find('div.messages-div-root').size()==0){
		$(parent).append(Messages.DIV_ROOT_HTML);		
	}
	
	var divRoot = $(parent).find('div.messages-div-root');
	$(divRoot).show();
	
	$(divRoot).prepend(Messages.DIV_MSG_ITEM_HTML.replace('#text#', text).replace('#index#', Messages.index));
	
	
	
	
	var currentItem = $(divRoot).find('div.messages-div-message-item[index='+Messages.index+']');
	
	
	$(currentItem).prepend(Messages.DIV_MSG_HEAD_HTML);
	
	var head = $(currentItem).find('.messages-div-message-item-head');
	
	if(options.button){
		$(head).append(Messages.DIV_BTN_CLOSE_HTML);
		
		var btn = $(head).find('.messages-div-message-item-btn-close');
		$(btn).bind('click',function(){
			
			Messages.remove($(currentItem).attr('index'));
			
		});
		
		
	}
	
	if(options.time!=0){
		window.setTimeout(function(){
			Messages.remove($(currentItem).attr('index'));
		}, options.time);
	}
	
	
	if(options.listenerWindowScroll==true){
		Messages.updatePositionDivRoot(document.body.scrollTop);
	}
	
	
	if(options.image){
		
		$(currentItem).prepend(Messages.DIV_IMG_HTML);
		if(imgDivClass){
			$(currentItem).find('.messages-div-message-item-img').addClass(imgDivClass);
		}
	}else{
		$(currentItem).find('.messages-div-message-item-btn-close').css('left','180px');    
	}
	
	
	if(title && title !=null && title!=''){
		$(head).append(Messages.DIV_MSG_TITLE_HTML.replace('#title#', title));
	}else{
		$(head).append(Messages.DIV_MSG_TITLE_HTML.replace('#title#', '&nbsp;'));
	}
	
	if(options.button){
		$(currentItem).find('.messages-div-message-item-title').css('left','-18px');		
	}
	
	if(!options.button){
		$(currentItem).bind('click',function(){
			
			Messages.remove($(currentItem).attr('index'));
			
		});
	}
	
	
	$(currentItem).slideDown('normal', function(){
		if(options.closeAll && $(divRoot).find('.messages-div-message-item').size()>1
				&& $(divRoot).find('.messages-div-message-item-fechar-todos').size()==0){
			$(divRoot).append(Messages.DIV_FECHAR_TODOS_HTML.replace('#text#', options.closeAllLabel));
			$(divRoot).find('.messages-div-message-item-fechar-todos').click(function(){
				Messages.removeAll();
			});
			
			$(divRoot).find('.messages-div-message-item-fechar-todos').hover(function(){
				$(this).addClass('messages-div-message-item-hover');
			},
			function(){
				$(this).removeClass('messages-div-message-item-hover');
			});
			
			$(divRoot).find('.messages-div-message-item-fechar-todos').fadeIn('normal');
		}
		
	});
	
	
	$(currentItem).hover(function(){
		$(this).addClass('messages-div-message-item-hover');
	},
	function(){
		$(this).removeClass('messages-div-message-item-hover');
	});
	
	
	
};

Messages.addErrorMessage=function(message, title){
	if(!title){
		title = 'Erro';
	}
	Messages.add(message,title,'img-error');
};

Messages.addInfoMessage=function(message, title){
	if(!title){
		title = 'Informação';
	}
	Messages.add(message,title,'img-info');
};

Messages.addFatalMessage=function(message, title){
	if(!title){
		title = 'Erro Grave';
	}
	Messages.add(message,title,'img-fatal');
};

Messages.addWarnMessage=function(message, title){
	if(!title){
		title = 'Aviso';
	}
	Messages.add(message,title,'img-warn');
};

Messages.addMessage=function(message, title){
	Messages.options.image = false;
	if(!title){
		title = '';
	}
	Messages.add(message,title);
	Messages.options.image = true;
};
