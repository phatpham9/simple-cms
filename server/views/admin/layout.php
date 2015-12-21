<!DOCTYPE html>
<html>
    <head>
        <base href="<?php echo base_url() ?>">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta name="description" content="<?php echo $site_description ?>">
        <meta name="keywords" content="<?php echo $keywords ?>">
        <meta name="author" content="<?php echo $authors ?>">
        <!-- Title -->
        <title><?php echo $site_title ?></title>
        <!-- Favicons -->
        <!--<link rel="apple-touch-icon" href="">
        <link rel="icon" href="">-->

        <!--STYLES-->
        <link rel="stylesheet" href="public/shared/styles/normalize.css">
        <link rel="stylesheet" href="public/shared/styles/bootstrap.min.css">
        <link rel="stylesheet" href="public/shared/styles/font-awesome.min.css">
        <link rel="stylesheet" href="public/shared/styles/ng-tags-input.bootstrap.css">
        <link rel="stylesheet" href="public/shared/styles/ng-tags-input.css">
        <link rel="stylesheet" href="public/shared/styles/textAngular.css">
        <!--STYLES END-->

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->
    </head>

    <body ng-app="simple-cms">
        <div class="wrapper">
            <div class="page-wrapper ui-view"></div>
        </div>

        <!--SCRIPTS-->
        <script src="public/shared/scripts/jquery.js"></script>
        <script src="public/shared/scripts/angular.js"></script>
        <script src="public/shared/scripts/ui-bootstrap.js"></script>
        <script src="public/shared/scripts/ui-bootstrap-tpls.js"></script>
        <script src="public/shared/scripts/angular-cookies.js"></script>
        <script src="public/shared/scripts/angular-resource.js"></script>
        <script src="public/shared/scripts/angular-sanitize.js"></script>
        <script src="public/shared/scripts/angular-ui-router.js"></script>
        <script src="public/shared/scripts/ng-tags-input.js"></script>
        <script src="public/shared/scripts/ngProgress.js"></script>
        <script src="public/shared/scripts/ocLazyLoad.js"></script>
        <script src="public/shared/scripts/textAngular-rangy.min.js"></script>
        <script src="public/shared/scripts/textAngular-sanitize.min.js"></script>
        <script src="public/shared/scripts/textAngular.min.js"></script>
        <script src="public/admin/app.js"></script>
        <script src="public/admin/routes/authRoute.js"></script>
        <script src="public/admin/routes/postRoute.js"></script>
        <script src="public/admin/routes/settingRoute.js"></script>
        <script src="public/admin/routes/tagRoute.js"></script>
        <script src="public/admin/routes/userRoute.js"></script>
        <!--SCRIPTS END-->
    </body>
</html>
