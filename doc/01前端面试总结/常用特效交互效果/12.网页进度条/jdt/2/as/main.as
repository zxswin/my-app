import flash.external.ExternalInterface;//����JS������
import as.loadPic;//װ�ؼ�����
function loadPicture(loadUrl,picDiv){
	var randomNum=random(1000000000);//����ID�����
	_root.createEmptyMovieClip("loadMc"+randomNum, _root.getNextHighestDepth());
	new loadPic(_root["loadMc"+randomNum],loadUrl,function(ob){
			//������ϴ���JS�ص�����
			new ExternalInterface.call("picCallBack", loadUrl,picDiv,ob._width,ob._height);
		},function(loadN){
			//ʵʱ����JS���������ƺ���
			new ExternalInterface.call("loadElement",picDiv,loadN);
		}
	)
}
ExternalInterface.addCallback("forjs",null,loadPicture);